<style scoped lang="less">
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 150px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
            margin-bottom: 200px;
            p{
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex{
            height: 100%;
        }
    }
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <i-col span="24">
                <h1>
                    <img src="../img/logo.png">
                </h1>
                <h2>
                    <p>Welcome to your iView app!</p>
                    <Button type="primary" @click="handleStart">Start iView</Button><br><br>
                    <Button type="ghost" @click="goBack">返回</Button><br>
                </h2>
            </i-col>
        </Row>
    </div>
</template>
<script>
export default {
  name: 'Hi',
  props: ['query'],
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
    console.log(this.query)
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    handleStart () {
      this.$Modal.info({
        title: 'Bravo',
        content: 'Now, enjoy the convenience of iView.'
      })
    }
  }
}
</script>
