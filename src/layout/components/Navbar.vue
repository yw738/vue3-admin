<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!-- <div class="flex">
          账户ID：{{ companyId }}
        </div> -->
      </template>
      <!-- trigger="click" -->
      <el-dropdown class="avatar-container right-menu-item hover-effect">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" /> -->
          <el-avatar :size="20" icon="UserFilled" />
          <span style="margin: 0 5px">{{ userName }}</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">
              <div class="flexItem">
                <span>退出</span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import useStore from '@/store';
// 组件依赖
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import Hamburger from '@/components/Hamburger/index.vue';
// 图标依赖
const { app, user, tagsView } = useStore();

// 跳转登录页
const toLogin = () => {
  const { app } = useStore();
  // ElMessage({
  //   message: '请重新登录',
  //   type: 'error'
  // });
  window.location.href = `${app.sassApi}/#/login`;
};
const route = useRoute();
const router = useRouter();

const sidebar = computed(() => app.sidebar);
const device = computed(() => app.device);
const userName = computed(() => user.userInfo.name||'暂无');
const companyId = computed(() => user.userInfo.companyId);

function toggleSideBar() {
  app.toggleSidebar();
}

function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    user
      .logout()
      .then(() => {
        tagsView.delAllViews();
      })
      .then(() => {
        toLogin();
      });
  });
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    display: flex;
    align-items: center;

    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 14px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      display: flex;
      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  margin-right: 10px;
  height: 100%;
  cursor: pointer;
  .el-icon {
    margin-right: 5px;
  }
}
.flex:hover {
  color: #79bbff;
  .el-icon {
    color: #79bbff;
    fill: #79bbff;
  }
}
.flexItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  margin: 5px 0;
}
</style>
