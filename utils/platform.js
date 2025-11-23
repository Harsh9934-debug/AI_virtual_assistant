import os from 'os';

export const getPlatform = () => {
    const platform = os.platform();
    return {
        isMac: platform === 'darwin',
        isWindows: platform === 'win32',
        isLinux: platform === 'linux',
        platform
    };
};

export const getCommand = (macCmd, windowsCmd, linuxCmd = macCmd) => {
    const { isMac, isWindows, isLinux } = getPlatform();
    if (isMac) return macCmd;
    if (isWindows) return windowsCmd;
    if (isLinux) return linuxCmd;
    return macCmd;
};
