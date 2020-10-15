/// <reference types="node" />
declare type FileDescriptor = number;
declare type MapProtectionFlags = MmapIo["PROT_NONE"] | MmapIo["PROT_READ"] | MmapIo["PROT_WRITE"] | MmapIo["PROT_EXEC"] | 3 | 5 | 6 | 7;
declare type MapFlags = MmapIo["MAP_PRIVATE"] | MmapIo["MAP_SHARED"] | MmapIo["MAP_NONBLOCK"] | MmapIo["MAP_POPULATE"] | number;
declare type MapAdvise = MmapIo["MADV_NORMAL"] | MmapIo["MADV_RANDOM"] | MmapIo["MADV_SEQUENTIAL"] | MmapIo["MADV_WILLNEED"] | MmapIo["MADV_DONTNEED"];
declare type MmapIo = {
    map(size: number, protection: MapProtectionFlags, flags: MapFlags, fd: FileDescriptor, offset?: number, advise?: MapAdvise): Buffer;
    advise(buffer: Buffer, offset: number, length: number, advise: MapAdvise): void;
    advise(buffer: Buffer, advise: MapAdvise): void;
    incore(buffer: Buffer): [number, number];
    sync(buffer: Buffer, offset?: number, size?: number, blocking_sync?: boolean, invalidate_pages?: boolean): void;
    sync(buffer: Buffer, blocking_sync: boolean, invalidate_pages?: boolean): void;
    readonly PROT_READ: 1;
    readonly PROT_WRITE: 2;
    readonly PROT_EXEC: 4;
    readonly PROT_NONE: 0;
    readonly MAP_SHARED: 1;
    readonly MAP_PRIVATE: 2;
    readonly MAP_NONBLOCK: 65536;
    readonly MAP_POPULATE: 32768;
    readonly MADV_NORMAL: 0;
    readonly MADV_RANDOM: 1;
    readonly MADV_SEQUENTIAL: 2;
    readonly MADV_WILLNEED: 3;
    readonly MADV_DONTNEED: 4;
    readonly PAGESIZE: number;
};
declare const mmap: MmapIo;
export default mmap;
