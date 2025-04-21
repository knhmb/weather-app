<template>
  <div class="edit-profile">
    <div class="header-content-background">
      <main-layout>
        <div class="header">
          <img
            @click="router.push('/')"
            :src="icons.ChevronLeftDark"
            alt="Chevron Left"
          />
          <h2>Edit Profile</h2>
        </div>
        <div class="profile-avatar-container">
          <div class="profile-avatar">
            <img :src="images.UserProfile" alt="Profile Avatar" />
            <div class="edit-container" v-if="isEditable">
              <div class="edit">
                <img :src="icons.EditLine" alt="Edit Line" />
              </div>
            </div>
          </div>
        </div>
      </main-layout>
    </div>
    <main-layout>
      <div class="user-info">
        <h3>Jane Doe</h3>
        <p>jane@gmail.com | +01 234 567 89</p>
      </div>
      <form @submit.prevent="handleClick" class="profile-form">
        <div class="input-container">
          <label> Full Name </label>
          <input :disabled="!isEditable" type="text" v-model="fullName" />
        </div>
        <div class="input-container">
          <label> Email </label>
          <input :disabled="!isEditable" type="email" v-model="email" />
        </div>
        <div class="input-container">
          <label> Phone Number </label>
          <input :disabled="!isEditable" type="text" v-model="phoneNumber" />
        </div>
        <button>
          {{ isEditable ? "Submit" : "Edit" }}
        </button>
      </form>
    </main-layout>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { icons, images } from "../utils/icons";
import MainLayout from "../components/templates/MainLayout.vue";

const router = useRouter();
const fullName = ref("Jane Doe");
const email = ref("jane@gmail.com");
const phoneNumber = ref("123 - 456 - 7890");
const isEditable = ref(false);

const handleClick = () => {
  if (!isEditable.value) {
    isEditable.value = true;
  } else {
    isEditable.value = false;
  }
};
</script>

<style lang="scss" scoped>
.header-content-background {
  background-color: #f1f4ff;
  border-bottom-left-radius: 50% 20%;
  border-bottom-right-radius: 50% 20%;
  position: relative;
  height: 20vh;

  .header {
    display: flex;
    align-items: center;

    img {
      cursor: pointer;
    }

    h2 {
      flex: 1;
      text-align: center;
      margin: 0;
    }
  }

  .profile-avatar-container {
    position: absolute;
    left: 50%;
    bottom: -4rem;
    translate: -50% 0;

    .profile-avatar {
      position: relative;

      .edit-container {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 0;
        right: 0;

        .edit {
          width: 80%;
          height: 80%;
          border-radius: 50%;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}

.user-info {
  text-align: center;
  margin-bottom: 1rem;
  margin-top: 2rem;

  h3 {
    margin: 0;
  }

  p {
    font-size: 0.9rem;
    color: #666;
  }
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  .input-container {
    position: relative;
    width: 100%;

    label {
      display: flex;
      flex-direction: column;
      font-size: 0.6rem;
      color: #757575;
      position: absolute;
      left: 1rem;
      top: 0.2rem;
    }

    input {
      outline: none;
      padding: 1.1rem 1rem 1rem 1rem;
      border-radius: 8px;
      font-size: 1rem;
      background-color: #f5f5f5;
      width: 100%;
      font-size: 1rem;
      border: none;

      &:not(:disabled) {
        background-color: #fff;
        border: 1px solid #ededed;
      }
    }
  }

  button {
    padding: 12.5px 16px;
    background-color: #2e3a5a;
    border-radius: 8px;
    border: none;
    color: #fff;
    position: fixed;
    bottom: 1rem;
    width: calc(100% - 3rem);
    cursor: pointer;
  }
}
</style>
