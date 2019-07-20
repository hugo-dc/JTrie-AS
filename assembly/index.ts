// The entry file of your WebAssembly module.
import * as env from './env'
import * as Blake2b from './blake2b'
class MerkleBranch {
    //witnesses: Array<Array<u8>>
    value: Array<u8>
        constructor(public witnesses: Array<Uint8Array>){
    }
}

class MerkleBranch2 {
    constructor(public witnesses: Array<Array<u8>>, public value: Array<u8>) {
        
    };

    public verify(root: Array<u8>, idx: u32): bool { // Array<u8> {
        // use let input_data = Uint8Array.wrap(input_data_buff, 0, input_data_len);
        var res = Array.create<u8>(32)
        res = this.value

        var treeIndex: u32 = <u32>Math.pow(<usize>2, <u32>1)

        for (var i= 0; i< this.witnesses.length; i++) {
            var hasher = Blake2b.def()

            var b = res
            if (treeIndex % 2 != 0) {
                var o = this.witnesses[i].concat(b)
                hasher.update(arrayToUint8Array(o), 0, o.length)
                res = uint8ArrayToArray(hasher.digest())
            } else {
                let o = this.witnesses[i].concat(b)
                hasher.update(arrayToUint8Array(o), 0, o.length)
                res = uint8ArrayToArray(hasher.digest())
            }

            treeIndex = <u32>(treeIndex / 2)
        }

        assert<Array<u8>>(root, res)
        if (res == root) {
            return true
        } else {
            return false
        }
    }
}

function arrayToUint8Array(a: Array<u8>): Uint8Array {
    var res = new Uint8Array(a.length)
    for (var i = 0; i < a.length; i++) {
        res[i] = a[i]
    }
    return res
}
function uint8ArrayToArray(u: Uint8Array): Array<u8> {
    var res = new Array<u8>(u.length)
    for (var i= 0; i < u.length; i++) {
        res[i] = u[i]
    }
    return res
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

function decode(str: string): Array<u8>{
    var length: u32 = str.length / 2
    var res = Array.create<u8>(length)
    var c = 0
    
    for (var i = 0; i < str.length; i+=2) {
        var sub = str.substring(i, i+2)
        res[c] = <u8>parseInt(sub, 16)
        c++
    }

    return res
}


export function main(): u8{
    var idx: u32 = 6997;
    var value = Array.create<u8>(32);
    value = decode('c10b1b74355bf6f5d2085b55bb459f5c14e9e4816c04ec72cca8e8bb5288cb50')
    var witnesses = Array.create<Array<u8>>(14)

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
    root = decode('f13a4bfaa28c22df47a4e0e89a54736b0a9bedc9727bbc3cc8a0e4237eb59ad9')

    var proofBranch: MerkleBranch = new MerkleBranch()
    //proofBranch.verify(root, idx)
    return value[0]
}

/*
export function main(): void {
    var preStateRootPtr: usize = __alloc(32, 0)
    env.eth2_loadPreStateRoot(preStateRootPtr)

    var idx: u32 = 6997;

    var value = Array.create<u8>(32);
    value = decode('c10b1b74355bf6f5d2085b55bb459f5c14e9e4816c04ec72cca8e8bb5288cb50')
    var witnesses = Array.create<Array<u8>>(14)

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
    root = decode('f13a4bfaa28c22df47a4e0e89a54736b0a9bedc9727bbc3cc8a0e4237eb59ad9')

    var proofBranch: MerkleBranch = new MerkleBranch(witnesses, value)
    proofBranch.verify(root, idx)

    var postStateRootPtr: usize = __alloc(32, 0)
    memory.copy(postStateRootPtr, preStateRootPtr, 32)

    env.eth2_savePostStateRoot(postStateRootPtr)
}
*/
