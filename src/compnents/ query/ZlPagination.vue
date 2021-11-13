<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item"><a class="page-link" @click="toFirst">首页</a></li>
      <li class="page-item"><a class="page-link" @click="toBack">上一页</a></li>
      <li class="page-item" :class="[num === pageNum? selected : '']" v-for="num in showNum" :key="num"><a
          class="page-link" @click="query(num)">{{ num }}</a></li>
      <li class="page-item" @click=""><a class="page-link" @click="toForward">下一页</a></li>
      <li class="page-item" @click=""></li>
      <li class="page-item"><a class="page-link">共</a></li>
      <li class="page-item"><a class="page-link">{{ totalPage }}</a></li>
      <li class="page-item"><a class="page-link">页</a></li>
      <li class="page-item"><a class="page-link">前往</a></li>
      <input type="text" :value="pageNum" style="display: none"/>
      <li class="page-item"><input type="text" v-model="page" @blur="toPage"/></li>
      <li class="page-item" value=""><a disabled="true" class="page-link">页</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'ZlPagination',
  props: ['total', 'pageNum', 'pageSize'],
  data: function () {
    return {
      showNum: [],
      selected: 'selected',
      totalPage: 0,
      page: 0
    }
  },
  watch: {
    total: function () {
      this.formatPageInfo()
    },
    pageNum: function () {
      this.formatPageInfo()
    }
  },
  methods: {
    formatPageInfo: function () {
      this.showNum = []
      let total = this.$props.total
      let pageSize = this.$props.pageSize
      let pageNum = this.$props.pageNum
      let totalPage = Math.ceil(total / pageSize)
      this.totalPage = totalPage
      if (totalPage < 5 || totalPage === 5) {
        for (var i = 1; i < totalPage || i === totalPage; i++) {
          this.showNum.push(i)
        }
      } else if (pageNum === totalPage) {
        this.showNum = [pageNum - 4, pageNum - 3, pageNum - 2, pageNum - 1, pageNum]
      } else if (pageNum === totalPage - 1) {
        this.showNum = [pageNum - 3, pageNum - 2, pageNum - 1, pageNum, pageNum + 1]
      } else if (pageNum === 1) {
        this.showNum = [pageNum, pageNum + 1, pageNum + 2, pageNum + 3, pageNum + 4]
      } else if (pageNum === 2) {
        this.showNum = [pageNum - 1, pageNum, pageNum + 1, pageNum + 2, pageNum + 3]
      } else {
        this.showNum = [pageNum - 2, pageNum - 1, pageNum, pageNum + 1, pageNum + 2]
      }
      this.page = this.pageNum
    },
    query: function (num) {
      this.$emit('changePage', num)
    },
    toFirst: function () {
      this.$emit('changePage', 1)
    },
    toLast: function () {
      this.$emit('changePage', this.totalPage)
    },
    toBack: function () {
      if (this.pageNum !== 1)  {
        this.$emit('changePage', this.pageNum - 1)
      }
    },
    toForward: function () {
      if (this.pageNum !== this.totalPage)  {
        this.$emit('changePage', this.pageNum + 1)
      }
    },
    toPage: function () {
      let page = this.page
      if (page < 1) {
        alert('页数必须大于1')
      } else if (page > this.totalPage) {
        alert('页数必须小于或等于' + this.totalPage)
      } else {
        this.$emit('changePage', page)
      }

    }
  }
}
</script>

<style scoped>
li input {
  height: 40px;
  text-align: right;
}
</style>
