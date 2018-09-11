module.exports = {
  "nested": {
    "login": {
      "nested": {
        "RoleInfo": {
          "fields": {
            "playerId": {
              "rule": "required",
              "type": "int64",
              "id": 1
            },
            "name": {
              "rule": "required",
              "type": "string",
              "id": 2
            },
            "sessionkey": {
              "rule": "required",
              "type": "string",
              "id": 3
            },
            "gameUrl": {
              "rule": "required",
              "type": "string",
              "id": 4
            },
            "camp": {
              "rule": "required",
              "type": "int64",
              "id": 5
            },
            "createDt": {
              "type": "uint64",
              "id": 6
            }
          }
        },
        "Login": {
          "fields": {
            "username": {
              "rule": "required",
              "type": "string",
              "id": 1
            },
            "token": {
              "type": "string",
              "id": 2
            },
            "clientPasswd": {
              "type": "string",
              "id": 3
            },
            "platform": {
              "type": "string",
              "id": 4,
              "options": {
                "default": "test"
              }
            },
            "osCode": {
              "type": "uint32",
              "id": 5
            },
            "deviceId": {
              "type": "string",
              "id": 6
            },
            "codeVersion": {
              "rule": "required",
              "type": "string",
              "id": 7
            },
            "serverId": {
              "rule": "required",
              "type": "int32",
              "id": 8
            },
            "subPlatform": {
              "type": "string",
              "id": 9,
              "options": {
                "default": "test"
              }
            },
            "userAgent": {
              "rule": "required",
              "type": "string",
              "id": 10
            }
          }
        },
        "LoginR": {
          "fields": {
            "err": {
              "type": "int64",
              "id": 1,
              "options": {
                "default": 0
              }
            },
            "info": {
              "type": "RoleInfo",
              "id": 2
            }
          }
        }
      }
    }
  }
}