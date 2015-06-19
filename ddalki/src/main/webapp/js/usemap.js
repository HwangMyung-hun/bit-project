/* HashMap 객체 생성 */
var JqMap = function(){
    this.map = new Object();
}
 
JqMap.prototype = {
    /* key, value 값으로 구성된 데이터를 추가 */
    put: function (key, value) {
        this.map[key] = value;
    },
    /* 지정한 key값의 value값 반환 */
    get: function (key) {
        return this.map[key];
    },
    /* 구성된 key 값 존재여부 반환 */
    containsKey: function (key) {
        return key in this.map;
    },
    /* 구성된 value 값 존재여부 반환 */
    containsValue: function (value) {
        for (var prop in this.map) {
            if (this.map[prop] == value) {
                return true;
            }
        }
        return false;
    },
    /* 구성된 데이터 초기화 */
    clear: function () {
        for (var prop in this.map) {
            delete this.map[prop];
        }
    },
    /*  key에 해당하는 데이터 삭제 */
    remove: function (key) {
        delete this.map[key];
    },
    /* 배열로 key 반환 */
    keys: function () {
        var arKey = new Array();
        for (var prop in this.map) {
            arKey.push(prop);
        }
        return arKey;
    },
    /* 배열로 value 반환 */
    values: function () {
        var arVal = new Array();
        for (var prop in this.map) {
            arVal.push(this.map[prop]);
        }
        return arVal;
    },
    /* Map에 구성된 개수 반환 */
    size: function () {
        var count = 0;
        for (var prop in this.map) {
            count++;
        }
        return count;
    }
}


/*사용법*/
/* json Test Data 
var oJsonValue = {
    "JsonFiled1" : "JsonVal1",
    "JsonFiled2" : "JsonVal2",
    "JsonFiled3" : "JsonVal3"
};
 HashMap  생성 
var oMap = new JqMap();
 Map에 key, value 값으로 구성된  데이터를 추가 
oMap.put("Key1","Val1");
oMap.put("Key2","Val2");
oMap.put("Key3","Val3");
oMap.put("ArrayKey",["Arr1","Arr2","Arr2"]); //Array
oMap.put("JsonKey",oJsonValue); //Json 형식
 
 Map에서 지정한 Key에 해당하는 Value 값을 반환 
console.log(oMap.get("Key1")); //결과 : Val1
console.log(oMap.get("ArrayKey")); //결과 : ["Arr1", "Arr2", "Arr2"]
console.log(oMap.get("ArrayKey")[0]); //결과 : Arr1
console.log(oMap.get("JsonKey")); //결과 : Object {JsonFiled1: "JsonVal1", JsonFiled2: "JsonVal2", JsonFiled3: "JsonVal3"}
console.log(oMap.get("JsonKey").JsonFiled1); //결과 : JsonVal1
 
 Map에서 지정한 Key에 해당하는 데이터 삭제 
oMap.remove("Key1");
console.log(oMap.get("Key1")); //결과 : undefined
 
 Map에서 지정한 Key가 존재 여부를 반환 
console.log(oMap.containsKey("Key2")); //결과 : true
console.log(oMap.containsKey("Val2")); //결과 : false / key 값이 아니여서 false로 반환
 
 Map에서 구성된 데이터에서 Value값 존재 여부를 반환 
console.log(oMap.containsValue("Val3")); //결과 : true
console.log(oMap.containsValue("ValEmpty")); //결과 : false / ValEmpty 지정된키로 등록된 값이 없어 false 반환
 
 Map에서 구성된 키정보를 배열로 반환 
var arKey = oMap.keys();
console.log(arKey); //결과 : ["Key2", "Key3", "ArrayKey", "JsonKey"]
 
 Map에서 구성된 Value값을 배열로 반환 
var arVal = oMap.values();
console.log(arVal);

결과 : ["Val2", "Val3", Array[3], Object]
0: "Val2"
1: "Val3"
2: Array[3]
    0: "Arr1"
    1: "Arr2"
    2: "Arr2"
3: Object
    JsonFiled1: "JsonVal1"
    JsonFiled2: "JsonVal2"
    JsonFiled3: "JsonVal3"
 
/* 추가된 데이터의 개수를 반환 
console.log(oMap.size()); //결과 : 5
 
 Map에 구성된 데이터를 초기화 
oMap.clear();
console.log(oMap.keys()); //결과 : [] / 초기화되어 데이터 없음*/