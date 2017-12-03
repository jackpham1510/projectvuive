<style lang="scss">
    .divide{
        margin-right: 20px;
        margin-left: 8px;
    }
</style>

<template>
    <div @click="$emit('click')">
        <h3>Merge Sort</h3>
        <hr>
        <h4>
            <label for="len">Array length: </label>
            <input type="number" name="len" v-model.number="len" style="margin-left: 12px;" min="3" max="10">
        </h4>
        <h4>
            <label for="max">Max number: </label>
            <input type="number" name="max" v-model.number="max" min="-100" max="100">
        </h4>
        <h4>
            <label for="custom">Custom Array: </label>
            <input type="checkbox" name="custom" style="margin-left: 3px;" v-model="custom">
        </h4>
        <h4 v-show="custom">
            <input type="number" 
                   v-for="(a, index) in myCustomArr"
                   v-model.number="customArr[index]" 
                   :key="index" 
                   style="margin-right: 10px; margin-left: 0">
        </h4>
        
        <v-btn style="background: #42b983; color: white" @click="newArray()">New Array</v-btn>
        <hr>
        <h4>Original Array:</h4>
        <template v-if="start">
                <div class="step" style="white-space: nowrap;">
                    <v-btn v-for="(a, index) in arr" 
                        class="arr"
                        :key="index">{{ a }}</v-btn>
                </div>

                <h4 v-if="end"><input type="checkbox" v-model="showRsOnly"> Show wrong step only</h4>
                <div v-for="(arrs, i) in myStep" :key="i" class="step" style="white-space: nowrap;">
                    <h4>
                        <span>Step: <input type="number" :value="i + 1" disabled></span>
                    </h4>     
                    <div v-show="!showRsOnly">
                        <span v-for="(a, j) in arrs" 
                                :key="j"  
                                @click.prevent="selectArray(i, j)">
                                <v-btn class="arr" :class="{ 'selected' :  selected[i][j]}">{{ a }}</v-btn><span class="divide" v-show="divide[i][j]"></span>
                        </span>
                        <span class="glyphicon" :class="{ 'glyphicon-remove' : trueFalse[i] == false}"></span>
                        <span class="glyphicon" :class="{ 'glyphicon-ok' : trueFalse[i] == true}"></span>
                        <br>
                        <v-btn style="min-width: 50px" color="error" @click="swap(i)">SWAP</v-btn>
                        <v-btn style="min-width: 50px" color="error" @click="newStep(i)">OK</v-btn>
                    </div>
                    
                    <template v-if="end && !trueFalse[i]">
                            <div>
                                <span v-for="(a, j) in arrSort[i]"   
                                    :key="j">
                                    <v-btn class="arr-rs">{{ a }}</v-btn><span class="divide" v-show="divideSort(i, j)"></span>
                                </span>
                            </div>
                            
                    </template>
                </div>
                <v-btn color="error" style="margin: 20px 0" @click="onSubmit()">Submit</v-btn>
        </template>
        
    </div>
</template>

<script>
let mid = [[]]
mid[3] = [[], [1], [0], [0], [1], []]
mid[4] = [[], [1], [0, 2], [0, 2], [1], []]
mid[5] = [[], [2], [1, 3], [0], [0], [1, 3], [2], []]
mid[6] = [[], [2], [1, 4], [0, 3], [0, 3], [1, 4], [2], []]
mid[7] = [[], [3], [1, 5], [0, 2, 4], [0, 2, 4], [1, 5], [3], []]
mid[8] = [[], [3], [1, 5], [0, 2, 4, 6], [0, 2, 4, 6], [1, 5], [3], []]
mid[9] = [[], [4], [2, 6], [1, 3, 5], [4], [4], [1, 3, 5], [2, 6], [4], []]
mid[10] =  [[], [4], [2, 7], [1, 3, 6, 8], [0, 5], [0, 5], [1, 3, 6, 8], [2, 7], [4], []]

let lr = [[]]
lr[3] = [[{l: 0, r: 1}], [{l: 0, r: 2}]]
lr[4] = [[{l: 0, r: 1}, {l: 2, r: 3}], [{l: 0, r: 3}]]
lr[5] = [[{l: 0, r: 1}], [{l: 0, r: 2}, {l: 3, r: 4}], [{l: 0, r: 4}]]
lr[6] = [[{l: 0, r: 1}, {l: 3, r: 4}], [{l: 0, r: 2}, {l: 3, r: 5}], [{l: 0, r: 5}]]
lr[7] = [[{l: 0, r: 1}, {l: 2, r: 3}, {l: 4, r: 5}], [{l: 0, r: 3}, {l: 4, r: 6}], [{l: 0, r: 6}]]
lr[8] = [[{l: 0, r: 1}, {l: 2, r: 3}, {l: 4, r: 5}, {l: 6, r: 7}], [{l: 0, r: 3}, {l: 4, r: 7}], [{l: 0, r: 7}]]
lr[9] = [[{l: 0, r: 1}], [{l: 0, r: 2}, {l: 3, r: 4}, {l: 5, r: 6}, {l: 7, r: 8}], [{l: 0, r: 4}, {l: 5, r: 8}], [{l: 0, r: 8}]]
lr[10] = [[{l: 0, r: 1}, {l: 5, r: 6}], [{l: 0, r: 2}, {l: 3, r: 4}, {l: 5, r: 7}, {l: 8, r: 9}], [{l: 0, r: 4}, {l: 5, r: 9}], [{l: 0, r: 9}]]

import myMixins from '../../../js/sapxep/Mixins.js'
export default {
    mixins: [myMixins],
    data() {
        return {
            len: 5,
            max: 10,
            start: false,
            end: false,
            showRsOnly: false,
            custom: false,
            customArr: [],
            arr: [],
            selected: [[]],
            stack: [[]],
            step: [[]],
            sort: [],
            arrSort: [],
            trueFalse: [],
            divide: [[]],
            mergeArr: [],
            midArr: mid,
            lrArr: lr,
        }
    },
    computed: {
        myLen() {
            if (typeof(this.len) != 'number'){
                return this.len;
            }
            if (this.len > 10){
                this.len = 10
            }
            else if (this.len < 3){
                this.len = 3
            }
            return this.len
        },
        myMax() {
            if (typeof(this.max) != 'number'){
                return this.max;
            }
            if (this.max > 100){
                this.max = 100
            }
            else if (this.max < 0){
                this.max = 0
            }
            return this.max
        },
        myStep() {
            return this.step
        },
        myCustomArr(){
            this.customArr.length = this.myLen
            for (let i = 0; i < this.customArr.length; i++){
                if (this.customArr[i] > 100){
                    this.customArr[i] = 100
                }
                else if (this.customArr[i] < 0 || typeof(this.customArr[i]) != 'number'){
                    this.customArr[i] = 0
                }
            }
            return this.customArr
        }
    },
    watch: {
        myLen() {
            this.newArray()
        },
        myMax(){
            this.newArray()
        }
    },
    methods: {
        selectArray(i, j) {
            if (this.end){
                return
            }
            this.$set(this.selected[i], j, !this.selected[i][j])
            
            let index = this.stack[i].indexOf(j)
            if (index != -1){
                this.stack[i].splice(index, 1)
                return
            }
            
            this.stack[i].push(j)
        },
        newArray(){
            this.start = true
            this.end = false
            if (this.custom){
                for (let i = 0; i < this.customArr.length; i++){
                    if (this.customArr[i] !== undefined){
                        this.arr[i] = this.customArr[i]
                    }
                }
            }
            else{
                for (let i = 0; i < this.myLen; i++){
                    this.arr[i] = Math.round(Math.random() * this.myMax)
                }
            }
            this.divide = [[]]
            this.sort = []
            this.arrSort = []
            this.trueFalse = []
            this.stack = [[]]
            this.selected = [[]]
            this.arr.splice(this.myLen)
            this.step.splice(0)
            this.step.push(this.arr)
            return this.arr
        },
        swap(index){            
            if (this.end){
                return
            }
            if (this.stack[index].length == 2){
                let b = []
                for (let k = 0; k < this.arr.length; k++){
                    b[k] = this.step[index][k]
                }
                let i = this.stack[index][0]
                let j = this.stack[index][1]
                let temp = b[i]
                b[i] = b[j]
                b[j] = temp
                this.stack[index] = []
                this.selected[index].splice(0, this.selected[index].length)
                this.step.splice(index, this.step.length - index + 1, b)
                return b
            }
        },
        newStep(index){
            if (this.end){
                return
            }
            
            for (let i = 0; i < this.stack[index].length; i++){
                if (this.stack[index][i] == this.arr.length - 1){
                    return
                }
            }
            //Clone current array
            let b = []
            for (let k = 0; k < this.arr.length; k++){
                b[k] = this.step[index][k]
            }
            this.step.splice(index + 1, this.step.length - index + 1, b)
            this.stack.splice(index + 1, this.stack.length - index + 1, [])
            this.selected.splice(index + 1, this.selected.length - index + 1, [])
            this.divide.splice(index + 1, this.divide - index + 1, [])
            for (let j = 0; j < this.divide[index].length; j++){
                this.divide[index + 1][j] = this.divide[index][j]
            }
            for (let j = 0; j < this.stack[index].length; j++){
                this.divide[index + 1][this.stack[index][j]] = !this.divide[index + 1][this.stack[index][j]]  
            }     
            this.scrollWin()
        },
        mergeSort() {
            let a = []
            for (let i = 0; i < this.arr.length; i++){
                a[i] = this.arr[i]
            }
            let c = []
            for (let i = 0; i < a.length; i++){
                c[i] = a[i]
            }
            for (let i = 0; i <= this.lrArr[this.myLen].length; i++){
                this.arrSort.push(c)
            }
            for (let k = 0; k < this.lrArr[this.myLen].length; k++){
                for (let g = 0; g < this.lrArr[this.myLen][k].length; g++){
                    let l = this.lrArr[this.myLen][k][g].l
                    let r = this.lrArr[this.myLen][k][g].r
                    let m = parseInt((l + r) / 2)
                    let x = l
                    let y = m + 1
                    let b = []
                    for (let i = l; i <= r; i++){
                        if (x <= m && y <= r){
                            b[i] = a[x] < a[y] ? a[x++] : a[y++]
                        }
                        else if (x <= m){
                            b[i] = a[x++]
                        }
                        else{
                            b[i] = a[y++]
                        }
                    }
                    for (let i = l; i <= r; i++){
                        a[i] = b[i]
                    }
                }
                let c = []
                for (let i = 0; i < a.length; i++){
                    c[i] = a[i]
                }
                this.arrSort.push(c)
            }
            //this.arrSort.push(this.arrSort[this.arrSort.length - 1])   
        },
        divideSort(i, j) {
            let rs = false;
            for (let k = 0; k <= i; k++){
                for (let g = 0; g < this.midArr[this.myLen][k].length; g++){
                    if (this.midArr[this.myLen][k][g] == j){
                        rs = true && (k < parseInt(this.midArr[this.myLen].length / 2))
                    }
                }
            }
            return rs
        }, 
        onSubmit() {
            if (this.end){
                return
            }
            this.end = true
            this.mergeSort()
            
            while (this.step.length < this.arrSort.length){
                this.step.push(this.step[this.step.length - 1])
                this.stack.push([])
                this.selected.push([])
                this.divide.push([])
            }
            for (let i = 0; i < this.step.length; i++){
                let temp = true
                for (let j = 0; j < this.arr.length; j++){
                    if (this.step[i][j] != this.arrSort[i][j]){
                        temp = false
                        break;
                    }
                }
                
                if (temp && i > 0){
                    let count = 0
                    let m = parseInt(this.midArr[this.myLen].length / 2)
                    for (let k = 0; k < this.divide[i].length; k++){
                        if (this.divide[i][k] == (i < m)){
                            count++

                        }
                    }
                    let count2 = 0
                    let k = (i >= m) ? m : 1
                    for (k; k <= i; k++){
                        count2 += this.midArr[this.myLen][k].length
                    }
                    temp = (count2 == count)
                }
                if (temp && i > 0){
                    for (let k = 0; k < this.midArr[this.myLen][i].length; k++){
                        if (this.divide[i][this.midArr[this.myLen][i][k]]
                        == (i >= parseInt(this.midArr[this.myLen].length / 2)) ||
                            this.divide[i][this.midArr[this.myLen][i][k]] == undefined){
                            temp = false;
                            stop = true;
                            break;
                        }
                    }
                }
                this.trueFalse[i] = temp
            }
        }
    }
}
</script>