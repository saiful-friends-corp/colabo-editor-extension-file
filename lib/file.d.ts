import { Node } from '@tiptap/core';
export interface FileOptions {
    inline: boolean;
    HTMLAttributes: Record<string, any>;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        file: {
            /**
             * Add an file
             */
            setFile: (options: {
                src: string;
                alt?: string;
                title?: string;
            }) => ReturnType;
        };
    }
}
export declare const inputRegex: RegExp;
export declare const File: Node<FileOptions, any>;
