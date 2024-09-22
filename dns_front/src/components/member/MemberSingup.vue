<template>
    <div>
        <h1>Sing up</h1>
        <form @submit="singUp">
            <div>
                <label for="email">Email:</label>
                <input v-model="email" type="email" id="email" placeholder="Email" />
            </div>
            <div>
                <label for="password">Password:</label>
                <input v-model="password" type="password" id="password" placeholder="Password" />
            </div>
            <div>
                <label for="nickname">Email:</label>
                <input v-model="nickname" type="text" id="nickname" placeholder="Nickname" />
            </div>
            <div>
                <label for="profileImageUrl">Profile Image URL:</label>
                <input v-model="profileImageUrl" type="text" id="profileImageUrl" placeholder="Profile Image URL" />
            </div>
            <div>
                <label for="socialType">social type:</label>
                <input v-model="socialType" type="text" id="socialType" placeholder="socialType" />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            nickname: '',
            profileImageUrl: '',
            socialType: ''
        };
    },
    methods: {
        async singUp() {
            try {
                const response = await axios.post('/api/members/signup', {
                    email: this.email,
                    password: this.password,
                    nickname: this.nickname,
                    profileImageUrl: this.profileImageUrl,
                    socialType: this.socialType
                });
                console.log("signup")
                alert(response.data);
            } catch (error) {
                alert(error.response.data);
            }
        }
    }
}

</script>