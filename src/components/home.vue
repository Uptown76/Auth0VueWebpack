<template>
    <div class="col-sm-6 col-sm-offset-3">
        <h1>Get Markdown with Get Down</h1>
        <button class="btn btn-primary" @click="login()" v-show="!isAuthenticated">Login</button>
        <button class="btn btn-primary" @click="logout()" v-show="isAuthenticated">Logout</button>
    </div>
</template>

<script>
    import Auth0Lock from 'auth0-lock';

    function checkIsAuthenticated() {
        return !!localStorage.getItem('id_token');
    }

    export default {
        data() {
            return {
                isAuthenticated: false,
                lock: new Auth0Lock('xxxxxx', 'xxxxxx')
            };
        },

        ready() {
            const self = this;
            this.isAuthenticated = checkIsAuthenticated();
            console.log(this.isAuthenticated);
            this.lock.on('authenticated', (authResult) => {
                console.log('authenticated');
                self.lock.getProfile(authResult.idToken, (err, profile) => {
                    if (err) {
                        // TODO: handle error
                        return;
                    }

                    localStorage.setItem('id_token', authResult.idToken);
                    localStorage.setItem('profile', JSON.stringify(profile));

                    self.isAuthenticated = true;
                    self.lock.hide();
                });
            });
        },

        methods: {
            login() {
                this.lock.show();
            },

            logout() {
                localStorage.removeItem('id_token');
                localStorage.removeItem('profile');
                this.isAuthenticated = false;
            }
        }
    };
</script>
