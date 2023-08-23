<template>
    <v-app :style="{ background: $vuetify.theme.themes.light.background }">
        <v-container>
            <v-row class="d-flex justify-center align-center" style="margin-top: 200px;">
                <v-col cols="12" sm="12" class="d-flex justify-center align-center">
                    <v-card
                        width="500"
                        height="400"
                        style="padding: 40px;"
                        elevation="0"
                        tile
                    >
                        <v-col>
                            <v-row no-gutters justify="start">
                                <v-card-title class="pa-0 mb-8 login-text">Log in</v-card-title>
                            </v-row>
                            <v-row no-gutters justify="start">
                                <v-text-field
                                    label="Username"
                                    v-model="username"
                                    outlined
                                    :rules="usernameRules"
                                />
                            </v-row>
                            <v-row no-gutters justify="start">
                                <v-text-field
                                    v-model="password"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show1 ? 'text' : 'password'"
                                    label="Password"
                                    @click:append="show1 = !show1"
                                    outlined
                                    tile
                                    :rules="passwordRules"
                                />
                            </v-row>
                            <v-btn
                                elevation="0"
                                width="100%"
                                height="50"
                                style="font-size: larger;font-weight: 200;color: white;"
                                color="#7FBA5E"
                                tile
                                @click="login"
                            >
                                Log in
                            </v-btn>
                        </v-col>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script src="./LoginPage.js">

</script>


<style scoped src="./LoginPage.css">

</style>
