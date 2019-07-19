// The entry file of your WebAssembly module.
import * as env from './env'
import * as Blake2b from './blake2b'

class MerkleBranch {
    constructor(public witnesses: Array<Uint8Array>, public value: Uint8Array) {};

    public verify(root: Array<u8>, idx: u32): void { // Array<u8> {
        // use let input_data = Uint8Array.wrap(input_data_buff, 0, input_data_len);
        var res = new Uint8Array(32)
        res = this.value

        var treeIndex = Math.pow(<usize>2, <u32>1)

        for (var i= 0; i< this.witnesses.length; i++) {
            var hasher = Blake2b.def()
            
            if (treeIndex % 2 != 0) {
                var b: Uint8Array = res
                var w = this.witnesses[i]
                var buf = w.buffer
                var o = Uint8Array.wrap(w.buffer, 0, 32)
                //var o = Uint8Array.wrap(this.witnesses[i].buffer, 0, this.witnesses[i].byteLength)
                o = o.concat(x)
                hasher.update(o, 0, o.length)
                res = hasher.digest()
            } else {
                var b: Uint8Array = res
                let o = this.witnesses[i].buffer//.concat(b)
                hasher.update(o, 0, o.length)
                res = hasher.digest()
            }
        }
    }
}

function convert(arr: Array<u8>): Array<u8> {
    var b = new Array<u8>(32);
    //var v = new DataView(b);
    for (var i=0; i<32; i++) {
        //v.setUint8(i, arr[i])
        b[i] = arr[i]
    }
    return b
}

function decode(str: string): Array<u8> {
    var length = str.length / 2
    //var res = new Uint8Array(length)
    var res = Array.create<u8>(length)
    var c = 0
    for (var i = 0; i < str.length; i+=2) {
        var sub = str.substr(i, 2)
        res[c] = <u8>parseInt(sub, 16)
        c++
    }
    return res
}

export function main(): void {
    var preStateRootPtr: usize = __alloc(32, 0)
    env.eth2_loadPreStateRoot(preStateRootPtr)

    var idx: u32 = 6997;

    var value = new Uint8Array(32);
    value = decode('c10b1b74355bf6f5d2085b55bb459f5c14e9e4816c04ec72cca8e8bb5288cb50')
    //var initialValue = new Array<u8>(32);
    //initialValue = [0xc1, 0x0b, 0x1b, 0x74, 0x35, 0x5b, 0xf6, 0xf5, 0xd2, 0x08, 0x5b, 0x55, 0xbb, 0x45, 0x9f, 0x5c, 0x14, 0xe9, 0xe4, 0x81, 0x6c, 0x04, 0xec, 0x72, 0xcc, 0xa8, 0xe8, 0xbb, 0x52, 0x88, 0xcb, 0x50];
    //value = [0xc1, 0x0b, 0x1b, 0x74, 0x35, 0x5b, 0xf6, 0xf5, 0xd2, 0x08, 0x5b, 0x55, 0xbb, 0x45, 0x9f, 0x5c, 0x14, 0xe9, 0xe4, 0x81, 0x6c, 0x04, 0xec, 0x72, 0xcc, 0xa8, 0xe8, 0xbb, 0x52, 0x88, 0xcb, 0x50];
    //decode("c10b1b74355bf6f5d2085b55bb459f5c14e9e4816c04ec72cca8e8bb5288cb50")

    //value = convert(initialValue)
    var witnesses = Array.create<Uint8Array>(14)
    //temp = [0xba, 0x5b, 0xa7, 0xea, 0x7c, 0x0f, 0xe5, 0xea, 0x73, 0x8a, 0x8d, 0x20, 0x7f, 0x07, 0x97, 0xdb, 0xb0, 0x65, 0x8b, 0xdc, 0xee, 0xb6, 0xbe, 0x70, 0x7e, 0x5e, 0x91, 0x2f, 0x0f, 0x7b, 0x27, 0x28]
    witnesses[ 0] = decode('ba5ba7ea7c0fe5ea738a8d207f0797dbb0658bdceeb6be707e5e912f0f7b2728')
    witnesses[ 1] = decode('e845c8789914f8e0b5d11bd7f90471820cfd568e735343bf4661da8b1dda0648')
    witnesses[ 2] = decode('ab163f24c3ba15c5ff71cf5efb50cad7498b82dfa037e436dc05331ef7ebe039')
    witnesses[ 3] = decode('97b87355c6fb49f0993779360f88792d527c572da72bde39305b53de6facda84')
    witnesses[ 4] = decode('37d65601a24040c2faf8c657828174ef9131e0a8c3a30f176fcdeb382a0c2a0d')
    witnesses[ 5] = decode('1325568476a58340b6dd1c0cc2127feff42c8d271aa559802b1b3d93d4899926')
    witnesses[ 6] = decode('3c77b2671efbb23acc796240fc3f4f047bacfc472a3de3d0978540179e4f9e14')
    witnesses[ 7] = decode('92e4884259792a7c891bba4532d25c1dcc74c648553d106344bb10c3840d4c6d')
    witnesses[ 8] = decode('df1a1e30b6fec4aec943937956102149691bc4b06992af48a43694cfa6849165')
    witnesses[ 9] = decode('3cd4cab3eb75edca1054bd5d9673131b834c893ac4997fce779ef295483276a0')
    witnesses[10] = decode('04126daaacf18b81a8008309feebb894e58a9bd3051ba8951a90f51e7d46a99f')
    witnesses[11] = decode('9e0cf8e9dac36bd52ce3cad4eb4fc0bf930e7543e5c790d61f6bd5c9f85ca0ee')
    witnesses[12] = decode('4c9649fbaad59383acc8dc17d6a2b47408e081b7ff955e983580536a2dbc3fd7')
    witnesses[13] = decode('89b6f049e518dc76c69f797ce4c7bc9c1b45328ea957b2634f21e7a10af9b0cb')

    var root = new Array<u8>(32)
    root = [0xf1, 0x3a, 0x4b, 0xfa, 0xa2, 0x8c, 0x22, 0xdf, 0x47, 0xa4, 0xe0, 0xe8, 0x9a, 0x54, 0x73, 0x6b, 0x0a, 0x9b, 0xed, 0xc9, 0x72, 0x7b, 0xbc, 0x3c, 0xc8, 0xa0, 0xe4, 0x23, 0x7e, 0xb5, 0x9a, 0xd9]

    var proofBranch: MerkleBranch = new MerkleBranch(witnesses, value)
    proofBranch.verify(root, idx)

    var postStateRootPtr: usize = __alloc(32, 0)
    memory.copy(postStateRootPtr, preStateRootPtr, 32)

    //var lastByte: u8 = load<u8>(preStateRootPtr, 31)
    //store<u8>(postStateRootPtr, lastByte + 1, 31)

    env.eth2_savePostStateRoot(postStateRootPtr)
}
