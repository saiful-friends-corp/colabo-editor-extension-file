/* eslint-disable no-unused-vars */
import {
  mergeAttributes,
  Node,
  nodeInputRule,
} from '@tiptap/core'

export interface FileOptions {
  inline: boolean,
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    file: {
      /**
       * Add an file
       */
      setFile: (options: { src: string, alt?: string, title?: string }) => ReturnType,
    }
  }
}

export const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/

export const File = Node.create<FileOptions>({
  name: 'file',

  addOptions() {
    return {
      inline: false,
      HTMLAttributes: {},
    }
  },

  inline() {
    return this.options.inline
  },

  group() {
    return this.options.inline ? 'inline' : 'block'
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'a[href]:not([href^="data:"])',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['a', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addCommands() {
    return {
      setFile: options => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        })
      },
    }
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: match => {
          const [,, alt, src, title] = match

          return { src, alt, title }
        },
      }),
    ]
  },
})
