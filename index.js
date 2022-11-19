// Generated by CoffeeScript 2.7.0
import {
  sha256Hex,
  sha256Bytes,
  sha512Hex,
  sha512Bytes
} from "secret-manager-crypto-utils";

//###########################################################
//region auth code

//###########################################################
// Hex Version
export var createAuthCode = function(seedHex, request) {
  var entropySource, requestString;
  if (typeof request !== "string") {
    requestString = JSON.stringify(request);
  }
  entropySource = seedHex + requestString;
  return sha256Hex(entropySource);
};

export var createAuthCodeHex = createAuthCode;

//###########################################################
// Byte Version
export var createAuthCodeBytes = function(seedBytes, request) {
  var entropySource, requestString, seedHex;
  if (typeof request !== "string") {
    requestString = JSON.stringify(request);
  }
  seedHex = tbut.bytesToHex(seedBytes);
  entropySource = seedHex + requestString;
  return sha256Bytes(entropySource);
};

//endregion

//###########################################################
//region session key

//###########################################################
// Hex Version
export var createSessionKey = function(seedHex, request) {
  var entropySource, requestString;
  if (typeof request !== "string") {
    requestString = JSON.stringify(request);
  }
  entropySource = seedHex + requestString;
  return sha512Hex(entropySource);
};

export var createSessionKeyHex = createSessionKey;

//###########################################################
// Byte Version
export var createSessionKeyBytes = function(seedBytes, request) {
  var entropySource, requestString, seedHex;
  if (typeof request !== "string") {
    requestString = JSON.stringify(request);
  }
  seedHex = tbut.bytesToHex(seedBytes);
  entropySource = seedHex + requestString;
  return sha512Bytes(entropySource);
};

//endregion