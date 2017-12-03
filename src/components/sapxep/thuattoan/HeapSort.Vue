<style lang="scss">
        .tree{
            margin-right: 0 !important;
        }
        .tab1{
            display: inline-block;
            margin-left: 170px;
        }
        .tab2{
            margin-left: 80px;
        }
        .tab3{
            margin-left: 30px;
        }
        .space1{
            margin-left: 150px;
        }
        .space2{
            margin-left: 55px;
        }
        .space3{
            margin-left: 10px;
        }
</style>

<template>
    <div @click="$emit('click')">
        <h3>Heap Sort</h3>
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
        <h4>
            <label for="custom">Tree mode: </label>
            <input type="checkbox" name="custom" style="margin-left: 3px;" v-model="tree">
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
        <h4>Original Array: </h4>
        <div class="step">
            <v-btn v-for="(a, index) in arr" 
                class="arr"
                :key="index">{{ a }}</v-btn>
        </div>
        <h4 v-if="end"><input type="checkbox" v-model="showRsOnly"> Show wrong step only</h4>
        <template v-if="start">
                <template v-if="!tree">
                    <div v-for="(arrs, i) in myStep" :key="i" class="step">
                        <h4>
                            <span>Step: <input type="number" :value="i" disabled style="text-align: center"></span>
                            <!-- <span style="margin-left: 5px">j: <input type="number" min="0" :max="arrs.length - 1"></span>-->
                        </h4>
                        <div v-show="!showRsOnly">
                            <v-btn v-for="(a, j) in arrs" 
                                    class="arr"
                                    :class="{ 'selected' :  selected[i][j]}"
                                    :key="j"  
                                    @click.prevent="selectArray(i, j)">{{ a }}</v-btn>
                            <v-btn style="min-width: 50px" color="error" @click="newStep(i)">OK</v-btn>
                            <span class="glyphicon" :class="{ 'glyphicon-remove' : trueFalse[i] == false}"></span>
                            <span class="glyphicon" :class="{ 'glyphicon-ok' : trueFalse[i] == true}"></span>
                        </div>
                        
                        <template v-if="end && i < sort.length && !trueFalse[i]">
                                <div>
                                    <v-btn v-for="(a, j) in arrSort[i]" 
                                        class="arr-rs"
                                        :class="{ 'sort' :  (sort[i].i == j || sort[i].j == j)}"
                                        :key="j"  
                                        @click.prevent="selectArray(i, j)">{{ a }}</v-btn>
                                </div>       
                        </template>
                    </div>
                </template>
                
                <template v-if="tree">
                    <div v-for="(arrs, i) in myStep" :key="i" class="step">
                        <h4>
                            <span>Step: <input type="number" :value="i" disabled style="text-align: center"></span>
                            <span class="glyphicon" :class="{ 'glyphicon-remove' : trueFalse[i] == false}"></span>
                            <span class="glyphicon" :class="{ 'glyphicon-ok' : trueFalse[i] == true}"></span>
                            <!-- <span style="margin-left: 5px">j: <input type="number" min="0" :max="arrs.length - 1"></span>-->
                        </h4>
                        <div v-show="!showRsOnly">
                            <span v-for="(a, j) in arrs" :key="j" style="white-space: nowrap;">
                                <span :class="tab[j]"></span>
                                <span :class="space[j]"></span>
                                <v-btn  class="arr tree"
                                        :class="{ 'selected' :  selected[i][j]}"
                                        @click.prevent="selectArray(i, j)">{{ a }}</v-btn>
                                <br v-show="endl[j]"/>
                            </span>
                            <br>
                            
                            <v-btn style="min-width: 50px" color="error" @click="newStep(i)" style="margin-top: 10px">OK</v-btn>  
                        </div>
                        
                        <template v-if="end && i < sort.length && !trueFalse[i]">
                                <div>
                                    <span v-for="(a, j) in arrSort[i]" :key="j" style="white-space: nowrap;">
                                        <span :class="tab[j]"></span>
                                        <span :class="space[j]"></span>
                                        <v-btn  class="arr-rs tree"
                                                :class="{ 'sort' :  (sort[i].i == j || sort[i].j == j)}"
                                                @click.prevent="selectArray(i, j)">{{ a }}</v-btn>
                                        <br v-show="endl[j]"/>
                                    </span>
                                </div>       
                        </template>
                    </div>
                </template>    
                <v-btn color="error" style="margin: 20px 0" @click="onSubmit()">Submit</v-btn>
        </template>
        
    </div>
</template>

<script>
import myMixins from '../../../js/sapxep/Mixins.js'
export default {
    mixins: [myMixins],
    data() {
        return {
            tree: false,
            space: ['', '', 'space1', '', 'space2', 'space2', 'space2', '', 'space3', 'space3', 'space3'],
            tab: ['tab1', 'tab2', '', 'tab3'],
            endl: [true, false, true, false, false, false, true, false, false, false],
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
            let temp = b[i]
            b[i] = b[j]
            b[j] = temp
            return b    
        },
        newStep(index){
            if (this.end){
                return
            }
            if (this.stack[index].length >= 1){
                let i = this.stack[index][0]
                let j = this.stack[index][this.stack[index].length == 2 ? 1 : 0]
                this.step.splice(index + 1, this.step.length - index + 1)
                this.step.push(this.swap(i, j))
                this.stack.splice(index + 1, this.stack.length - index + 1)
                this.stack.push([])
                this.selected.splice(index + 1, this.selected.length - index + 1)
                this.selected.push([])
                this.rs.splice(index, this.rs.length - index + 1)
                this.rs.push({i, j})
            }
            this.scrollWin()
        },
        heapSort() {
            let a = [];
            for (let i = 0; i < this.myLen; i++){
                a[i] = this.arr[i]
            }

            let _this = this
            // function isUpperArr(){
            //     for (let i = 0; i < _this.myLen - 1; i++){
            //         if (a[i] > a[i + 1]) return false;
            //     }
            //     return true;
            // }
            
            function hieuChinh(l, r){
                let i = l, j = (2 * i) + 1;
                while (j <= r){
                    // if (isUpperArr()) return;
                    if (a[j] < a[j + 1] && j < r) j++;	
                    if (a[j] <= a[i]) break;
                    else{
                        let b = []
                        for (let k = 0; k < _this.myLen; k++){
                            b[k] = a[k]
                        }
                        _this.sort.push({i : i, j : j})
                        _this.arrSort.push(b)
                        let temp = a[i]; a[i] = a[j]; a[j] = temp;
                        i = j; j = (2 * i) + 1;
                    }
                }	
            }
            function createHeap(l, r){
                let m = parseInt((l + r)/2);
                while (m >= 0){
                    // if (isUpperArr()) return;
                    hieuChinh(m, r);
                    m--;
                }	
            }

            function hsort(l, r){
                createHeap(l, r);
                do{
                    // if (isUpperArr()) return;
                    let b = []
                    for (let k = 0; k < _this.myLen; k++){
                        b[k] = a[k]
                    }
                    _this.sort.push({i : l, j : r})
                    _this.arrSort.push(b)
                    let temp = a[l]; a[l] = a[r]; a[r] = temp;  
                    r--;
                    hieuChinh(l, r);
                }while (l < r);
            }
            hsort(0, this.myLen - 1)
            
            this.arrSort.push(a)
            this.sort.push({})
            this.rs.push({})
            return this.sort
        },
        onSubmit() {
            if (this.end){
                return
            }
            this.end = true
            this.heapSort()
            while (this.step.length < this.arrSort.length){
                this.step.push(this.step[this.step.length - 1])
                this.stack.push([])
                this.selected.push([])
            }
            for (let i = 0; i < this.step.length - 1; i++){
                if (this.rs.length <= i || this.sort.length <= i){
                    this.trueFalse[i] = false
                }
                else { 
                    this.trueFalse[i] = ((this.rs[i].i == this.sort[i].i && this.rs[i].j == this.sort[i].j) ||
                    (this.rs[i].i == this.sort[i].j && this.rs[i].j == this.sort[i].i)) 
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