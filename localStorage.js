localData = {
    hname: location.hostname ? location.hostname : 'localStatus',
    isLocalStorage: window.localStorage ? true : false,
    dataDom: null,
    initDom: function() { //初始化userData
        if (!this.dataDom) {
            try {
                this.dataDom = document.createElement('input'); //这里使用hidden的input元素
                this.dataDom.type = 'hidden';
                this.dataDom.style.display = "none";
                this.dataDom.addBehavior('#default#userData'); //这是userData的语法
                document.body.appendChild(this.dataDom);
                var exDate = new Date();
                exDate = exDate.getDate() + 30;
                this.dataDom.expires = exDate.toUTCString(); //设定过期时间
            } catch (ex) {
                return false;
            }
        }
        return true;
    },
    set: function(key, value) {
        if (this.isLocalStorage) {
            window.localStorage.setItem(key, value);
        } else {
            if (this.initDom()) {
                this.dataDom.load(this.hname);
                this.dataDom.setAttribute(key, value);
                this.dataDom.save(this.hname)
            }
        }
    },
    get: function(key) {
        if (this.isLocalStorage) {
            return window.localStorage.getItem(key);
        } else {
            if (this.initDom()) {
                this.dataDom.load(this.hname);
                return this.dataDom.getAttribute(key);
            }
        }
    },
    remove: function(key) {
        if (this.isLocalStorage) {
            localStorage.removeItem(key);
        } else {
            if (this.initDom()) {
                this.dataDom.load(this.hname);
                this.dataDom.removeAttribute(key);
                this.dataDom.save(this.hname)
            }
        }
    },
    each: function() {
        for (var i = localStorage.length - 1; i >= 0; i--) {
            console.log('第' + (i + 1) + '条数据的键值为：' + localStorage.key(i) + '，数据为：' + localStorage.getItem(localStorage.key(i)));
        }
    },
    clear:function(){
        for (var i = localStorage.length - 1; i >= 0; i--) {
            // console.log('第' + (i + 1) + '条数据的键值为：' + localStorage.key(i) + '，数据为：' + localStorage.getItem(localStorage.key(i)));
            localStorage.removeItem(localStorage.key(i));
        }
    },
    merge:function(k,v){
        console.log("localData merage method start");
        var oldVal = JSON.parse(localData.get(k));
        var newVal = JSON.parse(v);
        var finalVal=[]
        for (var i = 0; i < oldVal.length; i++) {
             finalVal.push(oldVal[i]);
        }

        for (var i = 0; i < newVal.length; i++) {
            finalVal.push(newVal[i]);
        }
        localData.set(k,JSON.stringify(finalVal));
    }
}