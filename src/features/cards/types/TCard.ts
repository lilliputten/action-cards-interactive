import { TReactNode, TReactNodes } from '@/lib';

export interface TCard {
  /** Default card content */
  content: TReactNode;
  /** "What's wrong" text */
  explanation: TReactNodes;
  /** "To fix" text */
  resume: TReactNodes;
}
