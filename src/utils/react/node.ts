import { ReactNode } from 'react';

export type RenderableReactNode = Exclude<ReactNode, boolean | null | undefined>;

/**
 * 表示されない React node (`true`, `false`, `null`, `undefined`) の時に `false` を、それ以外は `true` を返す
 *
 * @see https://react.dev/reference/react/isValidElement#react-elements-vs-react-nodes:~:text=true%2C%20false%2C%20null%2C%20or%20undefined%20(which%20are%20not%20displayed)
 */
export const isRenderableReactNode = (node: ReactNode): node is RenderableReactNode => typeof node !== 'boolean' && node !== null && node !== undefined;
