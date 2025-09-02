---
slug: comparison-of-sha-hash-algorithms
title: Comparison of SHA Hash Algorithms
---

The Secure Hash Algorithm (SHA) family is a set of cryptographic hash functions published by the National Institute of Standards and Technology (NIST). These algorithms take input data and produce a fixed-size hash value (digest) that represents the original data. SHA algorithms are widely used for data integrity verification, digital signatures, and security applications.

### JavaScript Web Crypto API

JavaScript Web Crypto API supports SHA-1 SHA-256 SHA-384 SHA-512

```javascript
// convert to hex text
const bufferToHex = (buffer) => {
	const byteArray = new Uint8Array(buffer);
	return Array.from(byteArray)
	  .map(byte => byte.toString(16).padStart(2, '0'))
	  .join('');
};

const textInput = "hello";
const encoder = new TextEncoder();
const data = encoder.encode(textInput);

// Web Crypto API supports SHA-1 SHA-256 SHA-384 SHA-512
const hashAlgorithm = "SHA-256"; 
const hashBuffer = crypto.subtle.digest(hashAlgorithm, data);
const hashHex = bufferToHex(hashBuffer);
```

<!-- truncate -->

This online tool can help you calculate SHA-1 SHA-256 SHA-384 SHA-512 hash of text or file.

- [SHA-1](/tool/hash/sha-1)
- [SHA-256](/tool/hash/sha-256)
- [SHA-384](/tool/hash/sha-384)
- [SHA-512](/tool/hash/sha-512)

This tool use JavaScript Web Crypto API to generate hash in your browser, no backend, your privacy is secure.

### Summary Table

| Feature                  | SHA-1                             | SHA-256                                   | SHA-384                        | SHA-512                           |
| ------------------------ | --------------------------------- | ----------------------------------------- | ------------------------------ | --------------------------------- |
| **Output Size**          | 160 bits (20 bytes)               | 256 bits (32 bytes)                       | 384 bits (48 bytes)            | 512 bits (64 bytes)               |
| **Security Status**      | ❌ **Broken** (Insecure)           | ✅ **Secure** (Recommended)                | ✅ **Secure**                   | ✅ **Secure**                      |
| **Collision Resistance** | ❌ < 2⁶³ operations                | ✅ 2¹²⁸ operations                         | ✅ 2¹⁹² operations              | ✅ 2²⁵⁶ operations                 |
| **Pre-image Resistance** | ❌ Compromised                     | ✅ 2²⁵⁶ operations                         | ✅ 2³⁸⁴ operations              | ✅ 2⁵¹² operations                 |
| **Block Size**           | 512 bits                          | 512 bits                                  | 1024 bits                      | 1024 bits                         |
| **Word Size**            | 32 bits                           | 32 bits                                   | 64 bits                        | 64 bits                           |
| **Rounds**               | 80                                | 64                                        | 80                             | 80                                |
| **Algorithm Family**     | SHA-0/SHA-1                       | **SHA-2 Family**                          | **SHA-2 Family**               | **SHA-2 Family**                  |
| **Design Structure**     | Merkle–Damgård                    | Merkle–Damgård                            | Merkle–Damgård                 | Merkle–Damgård                    |
| **Common Applications**  | Legacy systems, Git (phasing out) | **SSL/TLS, Blockchain, Password storage** | **High-security applications** | **Maximum security requirements** |



### Performance Characteristics

| Algorithm   | Relative Speed                          | Memory Usage | Hardware Support         |
| ----------- | --------------------------------------- | ------------ | ------------------------ |
| **SHA-1**   | Fastest                                 | Lowest       | Widely supported         |
| **SHA-256** | Fast                                    | Low          | Well supported           |
| **SHA-384** | Moderate                                | Medium       | Good support             |
| **SHA-512** | Slower (on 32-bit) / Faster (on 64-bit) | Higher       | Excellent 64-bit support |

### Technical Details

**SHA-1 (Insecure)**

- **Introduced**: 1995
- **Status**: Cryptographically broken since 2005 (theoretical), 2017 (practical)
- **Vulnerabilities**: Susceptible to collision attacks (Google's SHAttered attack)
- **Current Use**: Legacy systems only, being phased out everywhere

**SHA-256 (Recommended Standard)**

- **Introduced**: 2001 (as part of SHA-2 family)
- **Security**: 128-bit collision resistance
- **Performance**: Excellent balance of speed and security
- **Adoption**: Industry standard for most applications

**SHA-384 (High Security)**

-   **Introduced**: 2001 (SHA-2 family)
-   **Security**: 192-bit collision resistance
-   **Features**: Truncated version of SHA-512
-   **Usage**: Government, financial institutions, long-term security

**SHA-512 (Maximum Security)**

-   **Introduced**: 2001 (SHA-2 family)
-   **Security**: 256-bit collision resistance
-   **Performance**: Optimized for 64-bit systems
-   **Applications**: Military, sensitive data protection, long-term archiving

### Example Hashes

Input: `"hello"`

| Algorithm   | Hash Output                                                                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **SHA-1**   | `aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d`                                                                                         |
| **SHA-256** | `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824`                                                                 |
| **SHA-384** | `59e1748777448c69de6b800d7a33bbfb9ff1b463e44354c3553bcdb9c666fa90125a3c79f90397bdf5f6a13de828684f`                                 |
| **SHA-512** | `9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043` |

### Migration Guidance

-   **Replace SHA-1 immediately** with SHA-256 or higher

-   **Use SHA-256** for most applications (web security, blockchain, authentication)

-   **Choose SHA-384/SHA-512** for:

    -   Government and military applications
    -   Long-term data protection (>10 years)
    -   High-value digital signatures
    -   FIPS 140-2 compliant systems

### Key Recommendations

1.  **✅ Use SHA-256** for general-purpose security applications
1.  **✅ Prefer SHA-384/SHA-512** for high-security requirements
1.  **❌ Avoid SHA-1** for all security-sensitive purposes
1.  **Consider performance**: SHA-512 can be faster than SHA-256 on 64-bit systems

> **Note**: All SHA-2 algorithms (SHA-256, SHA-384, SHA-512) are considered secure and are recommended by NIST for current and future applications.

### Summary

| Algorithm   | Security Strength | Status                 | Recommended Use               |
| ----------- | ----------------- | ---------------------- | ----------------------------- |
| **SHA-1**   | 0 bits            | ❌ **Deprecated**       | Legacy compatibility only     |
| **SHA-256** | 128 bits          | ✅ **Secure**           | General purpose, most common  |
| **SHA-384** | 192 bits          | ✅ **Very Secure**      | High-security applications    |
| **SHA-512** | 256 bits          | ✅ **Extremely Secure** | Maximum security requirements |

 
- SHA-1 is outdated and insecure; should only be used in legacy contexts.  
- SHA-256 is the most widely adopted modern hash; balances security and performance.  
- SHA-384 is SHA-512 truncated; provides higher security than SHA-256 with a shorter digest than SHA-512.  
- SHA-512 offers the strongest security and is optimized for 64-bit platforms; best for applications requiring very high collision resistance and large digests.