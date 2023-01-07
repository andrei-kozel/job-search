<template>
  <img
    :src="image"
    class="h-8 w-8 rounded-full object-contain"
    alt="User profile image"
  />
</template>

<script>
export default {
  name: "ProfileImage",
  data() {
    return {
      image: "https://i.pravatar.cc/300",
    };
  },
};
</script>
