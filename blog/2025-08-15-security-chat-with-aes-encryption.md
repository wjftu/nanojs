---
slug: security-chat-with-aes-encryption
title: Security Chat with AES Encryption
---

Alice and Bob care about their privacy and want to encrypt their communication using AES encryption.


<!-- truncate -->

Alice and Bob open chat on WeChat. WeChat is not trustable. Tencent, as a Chinese company, is subject to country's laws and provides user data to Chinese govenment. Alice and Bob kew their messages on WeChat were not protected. They want to use AES to encrypt their message before send via WeChat. 

One day, Alice and Bob met at a park. They want to generate a random AES key. They use this tool to generate a random base64 formated key.

Random key generate tool:  
https://nanojs.net/tool/encode/key-generator

This online tool is running in browser with JavaScript and have not backend server. So they trusted this tool.

They generated a key:

```
YWJjZGVmMTIzNDU2Nzg5MEFCQ0RFRistKi88PiwuPy8=
```

They didn't want others, include WeChant, to know their key, so they met offline and generated key together.

They wrote id down in paper or secure notes app.

They agreed on this key and agreed on using this key with AES-GCM encryption to encrypt message.

They did not want to implement AES encryption tool, so they were going to use this online AES GCM encryptor and decryptor:

https://nanojs.net/tool/encode/aes-gcm

This online encryptor tool also has no backend. Encryption and decryption happen entirely in Alice's and Bob's browsers. Their provacy is protected.

Later that evening, Alice wanted to message Bob. She opened the encryption tool on the website. Shi typed in the key they had agreed upon. She typed her message: `Hi Bob, can you read this message?`. She clicked the 'encrypt' button. The tool produced a string of seemingly random characters:

```
GXukrT2yuLnyVNrH57WM+nZ+R1iwwTpjBW7a8MugtCAdhYU8dFRFDZQ/99JhnKhReDVECdOizpETC9lDFjs=
```

If you do the same thing you will get an encrypted string, but different with this one. Because AES-GCM generated a random initialization Vector each time.

Alice sent the message to Bob via WeChat.

When Bob received Alice's garbled message on WeChat, he knew exactly what to do. He opened the same website and typed in the secret key he had written down. He then copied Alice's encrypted message and pasted it into the encryptor tool. He clicked 'decrypt' button and the original message appeared. 

Bob wanted to reply `Yes. We did it!`

Bob has successfully read message from Alice, while WeChat backend could only see random base64 string. He used the same method to encrypt the message and got an encrypted string : `RVq8++VR8KHZbJE1QOOgrrCGYjGcSBJsVWSH0EN0R5STFnIQv8qCqF4F/A==` . He sent the encrypted string to Alice. And Alice used the same method to decrypt the message and read it.

They did it. From that time, although they were using untrusted app, their conversations remained private, secured by the power of client-side encryption.