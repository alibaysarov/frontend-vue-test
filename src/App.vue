<template>
  <section>
    <Header/>
    <Container>
      <div class="mt-[100px] flex flex-col items-center gap-[10px]">
        <div ref="rowRef" v-for="(row,id) in content" :key="id"  class="flex gap-[10px]">
            <div class="p-[5px] text-[26px] shadow-lg item-elem rounder-sm cursor-pointer transform transition duration-500 hover:scale-80" v-for="(item,id) in row">{{item}}</div>
        </div>
      </div>
    </Container>
  </section>
</template>
<script setup>
import Header from "./components/Header.vue";
import Container from "./components/Container.vue";
import { generateList} from "./helpers/generateList.js"
import {onMounted, ref, watch} from "vue";
const content = ref(generateList());

const rowRef = ref(null);
const visibleRowRefs = ref([]);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const targetRef = entry.target;
    if (entry.isIntersecting) {
      // Добавляем targetRef в список видимых rowRef
      if (!visibleRowRefs.value.includes(targetRef)) {
        visibleRowRefs.value.push(targetRef);
      }
    } else {
      // Удаляем targetRef из списка видимых rowRef
      visibleRowRefs.value = visibleRowRefs.value.filter(
          (ref) => ref !== targetRef
      );
    }
  });
});

onMounted(() => {

  rowRef.value.forEach((ref) => {
    observer.observe(ref);
  });
});

watch(() => rowRef.value, (newVal) => {

});
const refreshList = (row)=>{
  row.forEach(item=>{
    const arr_length = item.querySelectorAll('.item-elem').length;
    const indexToUpdate = Math.abs(Math.floor(Math.random()*arr_length-1))
    item.querySelectorAll('.item-elem')[indexToUpdate].classList.add('bg-red-500')
    item.querySelectorAll('.item-elem')[indexToUpdate].textContent = Math.floor(Math.random()*100)
    item.querySelectorAll('.item-elem')[indexToUpdate].addEventListener('transitionend',()=>{
      item.querySelectorAll('.item-elem')[indexToUpdate].classList.remove('bg-red-500');
    })
  })
}
watch(() => visibleRowRefs.value, (newVal) => {
  refreshList(newVal)

});
setInterval(()=>{
  if(visibleRowRefs.value.length) {
    refreshList(visibleRowRefs.value)
  }
},1000)
</script>
<style lang="scss" scoped>
  .item-elem {
    &:hover{
      transform: scale(.8);
    }
  }
</style>
