import VueRouter from 'vue-router'
import Home from '../../components/sapxep/Home.vue'
import SelectionSort from '../../components/sapxep/thuattoan/SelectionSort.vue'
import InsertionSort from '../../components/sapxep/thuattoan/InsertionSort.vue'
import BubleSort from '../../components/sapxep/thuattoan/BubleSort.vue'
import HeapSort from '../../components/sapxep/thuattoan/HeapSort.vue'
import QuickSort from '../../components/sapxep/thuattoan/QuickSort.vue'
import MergeSort from '../../components/sapxep/thuattoan/MergeSort.vue'

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/sapxep/home', component: Home },
        { path: '/sapxep/selection-sort', component: SelectionSort },
        { path: '/sapxep/insertion-sort', component: InsertionSort },
        { path: '/sapxep/buble-sort', component: BubleSort },
        { path: '/sapxep/heap-sort', component: HeapSort },
        { path: '/sapxep/quick-sort', component: QuickSort },
        { path: '/sapxep/merge-sort', component: MergeSort },
    ]
})