import { UserConfig } from 'vite';
/**
 * 自定义开发/编译配置
 *
 * @param {boolean} isDev 是否开发环境
 * @param {UserConfig} options vite配置
 * @param {() => void} [callback] 编译结束后的回调
 */
export declare const run: (isDev: boolean, options: UserConfig, callback?: () => void) => void;
