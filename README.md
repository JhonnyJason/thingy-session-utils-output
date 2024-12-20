# thingy-session-utils 

# Background
On some time after developing on the [Secret Management](https://hackmd.io/PZjpRfzPSBCqS-8K54x2jA) path the idea to use these same cryptographic primitives (Curve25519 + AES and SHA-2) for all all [Client Service Authentication](https://hackmd.io/DjnHMT0TSlmffXZTsm4f7A?view) become quite stubborn.

This lead to a few ways on how to build Sessions - this convenience library is their implementation.



# Usage

Requirements
------------
- ESM importability

Installation
------------
Current git version:
```
npm install git+https://github.com/JhonnyJason/thingy-session-utils-output.git
```

Npm Registry:
```
npm install thingy-session-utils
```


Current Functionality
---------------------
- create AuthCodes
- create SessionKeys

```coffee
import * as sessUtl from "thingy-session-utils"

## auth code
# sessUtl.createAuthCode is sessUtl.createAuthCodeHex
sessUtl.createAuthCodeHex( seedHex, request ) -> authCodeHex
sessUtl.createAuthCodeHex( StringHex , String || Object ) -> StringHex64

sessUtl.createAuthCodeBytes( seedBytes, request ) -> authCodeHex
sessUtl.createAuthCodeBytes( Uint8Array , String || Object ) -> Uint8Array32

## session key
# sessUtl.createSessionKey is sessUtl.createSessionKeyHex
sessUtl.createSessionKeyHex( seedHex, request ) -> sessionKeyHex
sessUtl.createSessionKeyHex( StringHex, String || Object ) -> StringHex128

sessUtl.createSessionKeyBytes( seedBytes, request ) -> sessionKeyBytes
sessUtl.createSessionKeyBytes( Uint8Array, String || Object ) -> Uint8Array64

```

## AuthCodes
AuthCodes are onetime Codes which are used by a service who which knows the public key of its clients to proof their posession of the private key - thus are strongly as this client on every request.

They are generated from an commonly known `seed` - usually the shared Secret from the client and services keypairs - hashed with a commonly known context. The `seed` stays the same for the whole session.
The `seed` shall be generated in such a way that it is unique to every session.

The other part - the `request` - might be one specifically known request, the last known or the current. It is passed as string or as object. 

As the request is unique for every call (containing a timestamp) - the hash value of seed + "request" is always unique and may only be generated by both of the involved parties. 

Any man in the middle cannot extract or reuse the AuthCode. It can be regarded as similarily strong as with signature - but is significantly faster.

At best use the Hex version, it even seems to be faster ;-)

## SessionKeys
This is for the situation when we want to encrypt our session. Usually unnecessary because we use HTTPS anyways ;-).

Depending how far your <s>knowledge</s> trust goes, and depending on the situation it still makes sense of course.

The session keys are 64bytes = 512bit (from sha512). This way you may directly use it for `secUtl.symmetricEncryptHex(content, sessionKey)`.


---

# Further steps

- gather more functionality to put in here
- performance optimizations?
- ...


All sorts of inputs are welcome, thanks!

---

# License
[CC0](https://creativecommons.org/publicdomain/zero/1.0/)
