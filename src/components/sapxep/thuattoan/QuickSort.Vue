<template>
    <div @click="$emit('click')">
        <h3>Quick Sort</h3>
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
        
        <button type="button" class="btn btn-success" @click="newArray()">New Array</button>
        <hr>
        <h4>Original Array: </h4>
        <template v-if="start">
                <div class="step">
                    <span v-for="(a, index) in arr" 
                        class="arr"
                        :key="index">{{ a }}</span>
                </div>
                <h4 v-if="end"><input type="checkbox" v-model="showRsOnly"> Show wrong step only</h4>
                <div v-for="(arrs, i) in myStep" :key="i" class="step">
                    <div v-show="!showRsOnly">
                        <h4>
                            <span>left:
                                <input v-model.number="lrArr[i].l" type="number" min="0" :max="arrs.length - 1" style="text-align: center">
                            </span>
                            <span style="margin-left: 5px">right: 
                                <input v-model.number="lrArr[i].r" type="number" min="0" :max="arrs.length - 1" style="text-align: center">
                            </span>
                            <br v-if="xEndl">
                            <br v-if="xEndl">
                            <span :style="{marginLeft : (xEndl ? 2 : 5) + 'px'}">x:
                                <span style="margin-left: 7px">a[</span>
                                <input v-model.number="xArr[i]" type="number" min="0" :max="arrs.length - 1" style="text-align: center; margin-left: 0;"> ]
                            </span>
                        </h4>
                        <span v-for="(a, j) in arrs" 
                                class="arr"
                                :class="[{ 'sort' :  stack[i][0] == j}, {'selected' : stack[i][1] == j}]"
                                :key="j"  
                                @click.prevent="selectArray(i, j)">{{ a }}</span>
                        <a class="arr selected" @click="newStep(i)">OK</a>
                        <span class="glyphicon" :class="{ 'glyphicon-remove' : trueFalse[i] == false}"></span>
                        <span class="glyphicon" :class="{ 'glyphicon-ok' : trueFalse[i] == true}"></span>
                    </div>
                    
                    <template v-if="end && i < sort.length && !trueFalse[i]">
                            <h4>
                                <span>left:
                                    <input :value="lrArrSort[i].l" type="number"style="text-align: center" disabled>
                                </span>
                                <span style="margin-left: 5px">right: 
                                    <input :value="lrArrSort[i].r" type="number"style="text-align: center" disabled>
                                </span>
                                <br v-if="xEndl">
                                <br v-if="xEndl">
                                <span :style="{marginLeft : (xEndl ? 2 : 5) + 'px'}">x:
                                    <span style="margin-left: 7px">a[</span>
                                    <input :value="xArrSort[i]" type="number"style="text-align: center; margin-left: 0;" disabled> ]
                                </span>
                            </h4>
                            <span v-for="(a, j) in arrSort[i]" 
                                  class="arr-rs"
                                  :class="[{ 'sort' :  (sort[i].i == j)}, {'selected' : (sort[i].j == j)}]"
                                  :key="j"  
                                  @click.prevent="selectArray(i, j)">{{ a }}</span>
                            <span style="font-size: 16px;">(i: {{ sort[i].i }}, j: {{sort[i].j}})</span>
                    </template>
                </div>
                <button type="button" class="btn btn-danger selected" style="margin: 20px 0" @click="onSubmit()">Submit</button>
        </template>
        
    </div>
</template>

<script>
import myMixins from '../../../js/sapxep/Mixins.js'
export default {
    mixins: [myMixins],
    data() {
        return {
            xEndl: window.innerWidth <= 900,
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
            rs: [],
            arrSort: [],
            trueFalse: [],
            lrArr: [],
            lrArrSort: [{}],
            xArr: [],
            xArrSort: [],
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
            else if (this.stack[i].length >= 2){
                let top = this.stack[i][this.stack[i].length - 1]
                this.$set(this.selected[i], top, false)
                this.stack[i].pop()
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
            this.xArr = []
            this.xArrSort = []
            this.lrArr = [{l : '', r : ''}]
            this.lrArrSort = []
            this.rs = []
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
        swap(i, j){
            let b = []
            let n = this.step.length - 1
            for (let k = 0; k < this.arr.length; k++){
                b[k] = this.step[n][k]
            }
            if (i < j){
                let temp = b[i]
                b[i] = b[j]
                b[j] = temp
            }       
            return b    
        },
        newStep(index){
            if (this.end){
                return
            }
            if (this.stack[index].length >= 1){
                let i = this.stack[index][0]
                let j = this.stack[index][this.stack[index].length == 2 ? 1 : 0]
                this.step.splice(index + 1, this.step.length - index + 1, this.swap(i, j))
                this.stack.splice(index + 1, this.stack.length - index + 1, [])
                this.selected.splice(index + 1, this.selected.length - index + 1, [])
                this.rs.splice(index, this.rs.length - index + 1, {i, j})
                this.lrArr.splice(index + 1, this.lrArr.length - index + 1, {l : '', r : ''})
                this.xArr.splice(index + 1, this.xArr.length - index + 1)
            }
            this.scrollWin()
        },
        quickSort() {
            let a = [];
            for (let i = 0; i < this.myLen; i++){
                a[i] = this.arr[i]
            }
            let _this = this
            function qsort(l, r) {
                let i = l, j = r, x = a[parseInt((l + r) / 2)]
                _this.lrArrSort.push({l : l, r : r}) 
                _this.xArrSort.push(parseInt((l + r) / 2))
                do{
                    while (a[i] < x) i++
                    while (a[j] > x) j--
                    if (i <= j){
                        _this.lrArrSort.push({l : l, r : r}) 
                        _this.xArrSort.push(parseInt((l + r) / 2))
                        _this.sort.push({i : i, j : j})
                        let b = []
                        for (let k = 0; k < a.length; k++){
                            b[k] = a[k]
                        }
                        _this.arrSort.push(b)
                        let temp = a[i]; a[i] = a[j]; a[j] = temp
                        i++; j--;
                    }
                }while (i < j)

                _this.sort.push({i : i, j : j})
                
                let b = []
                for (let k = 0; k < a.length; k++){
                    b[k] = a[k]
                }
                _this.arrSort.push(b)

                if (j > l) qsort(l, j)
                if (i < r) qsort(i, r)               
            }
            qsort(0, a.length - 1)
            this.arrSort.push(a)
            this.lrArrSort.push({l : '', r : ''})
            this.lrArr.push({})
            this.sort.push({})
            this.rs.push({})
            return this.sort
        },
        onSubmit() {
            if (this.end){
                return
            }
            this.end = true
            this.quickSort()
            while (this.step.length < this.arrSort.length){
                this.step.push(this.step[this.step.length - 1])
                this.lrArr.push({l: '', r: ''})
                this.stack.push([])
                this.selected.push([])
            }
            if (this.lrArr.length > this.lrArrSort.length){
                this.lrArr.pop()
            }  
            for (let i = 0; i < this.step.length - 1; i++){
                if (this.rs.length <= i || this.sort.length <= i){
                    this.trueFalse[i] = false
                }
                else { 
                    this.trueFalse[i] = ((this.rs[i].i == this.sort[i].i && this.rs[i].j == this.sort[i].j) 
                    || (this.rs[i].i == this.sort[i].j && this.rs[i].j == this.sort[i].i)) 
                    && (this.lrArr[i].l == this.lrArrSort[i].l && this.lrArr[i].r == this.lrArrSort[i].r)
                    && (this.xArr[i] == this.xArrSort[i])
                    && (i > 0 ? this.trueFalse[i - 1] : true)
                    
                }
            }
            let temp = true
            for (let i = 0; i < this.arr.length; i++){
                if (this.step[this.step.length - 1][i] != this.arrSort[this.arrSort.length - 1][i]){
                    temp = false;
                    break;
                }
            }
            this.trueFalse[this.step.length - 1] = temp
        }
    }
}
</script>