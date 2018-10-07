module.exports = 
{
  "nested": {
    "login": {
      "nested": {
        "RoleInfo": {
          "fields": {
            "playerId": {
              "type": "int64",
              "id": 1
            },
            "name": {
              "type": "string",
              "id": 2
            },
            "sessionkey": {
              "type": "string",
              "id": 3
            },
            "gameUrl": {
              "type": "string",
              "id": 4
            },
            "camp": {
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
              "type": "string",
              "id": 7
            },
            "serverId": {
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