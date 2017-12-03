<template>
  <div class="sidebar" id="sidebar">
        <h4>
            <span @click="$emit('click')">
                <router-link to="/sapxep/home">Home</router-link>
            </span>
        </h4>
        <h3 class="level">Easy</h3>
        <h4>
            <span @click="$emit('click')">
                <router-link to="/sapxep/selection-sort" @click="$emit('click')">Selection Sort</router-link>
            </span>
        </h4>
        <h4>
            <span @click="$emit('click')">
                <router-link to="/sapxep/insertion-sort" @click="$emit('click')">Insertion Sort</router-link>
            </span>
        </h4>
        <h3 class="level">Medium</h3>
        <h4>
            <span @click="$emit('click')">
                <router-link to="/sapxep/buble-sort" @click="$emit('click')">Buble Sort</router-link>
            </span>
        </h4>
        <h4>
            <span @click="$emit('click')">
                <router-link to="/sapxep/merge-sort" @click="$emit('click')">Merge Sort</router-link>
            </span>
        </h4>  
        <h3 class="level">Hard</h3>
        <h4>
            <span @click="$emit('click')">
                <router-link to="/sapxep/quick-sort" @click="$emit('click')">Quick Sort</router-link>
            </span>
        </h4>
        <h4>
            <span @click="$emit('click')">
                <router-link to="/sapxep/heap-sort" @click="$emit('click')">Heap Sort</router-link>
            </span>
        </h4>
  </div>
</template>