<template>
    <v-app style="background-color: #faf9f7;">
        <div class="d-flex justify-center">
        <SideBar/>
        <v-img 
            v-if="groups.status_code == 204"
            src="@/assets/no-data.svg"
            style="position: absolute;width: 50%"
        />
        <v-container fluid style="padding: 30px 100px 0px 100px;">
            <v-row no-gutters class="mt-2 mb-5">
                <div style="color: #323b50; font-size: 25px" v-if="groups.length > 0">Groups</div>
                <v-spacer />
                <v-btn
                    elevation="0"
                    style="color: #7FBA5E; border: 1px solid #7FBA5E; background-color: transparent"
                    @click="group_no = null, drawer = !drawer"
                >
                    <v-icon color="#7FBA5E"> mdi-account-group-outline </v-icon>
                    +
                </v-btn>
            </v-row>

            <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
                right
                width="400"
                class="pa-8"
            >
                <div style="font-size: 20px;margin-bottom: 20px">Add new group</div>
                <v-text-field dense class="mb-n3" outlined label="Group NO" v-model="group_no"/>
                <v-btn
                    elevation="0"
                    width="100%"
                    height="35"
                    style="color: #7FBA5E; font-size: 17px; font-weight: 300; border: 1px solid #7FBA5E; background-color: transparent;"
                    @click="addGroup"
                >
                    Save
                </v-btn>
            </v-navigation-drawer>

            <v-simple-table dense v-if="groups.length > 0" style="background-color: #faf9f7;">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th
                                v-for="(item, i) in headers"
                                :key="i"
                            >
                                {{ item }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="(item, i) in groups" 
                            :key="i"
                        >
                            <td>{{ item.id }}</td>
                            <td>{{ item.no }}</td>
                            <td>
                                <v-btn icon x-small>
                                    <v-icon color="orange" size="18">mdi-pencil-outline</v-icon>
                                </v-btn>
                                <v-btn icon x-small @click="deleteGroup(item.id)">
                                    <v-icon color="red" size="18">mdi-delete-outline</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-container>
        </div>
    </v-app>
</template>

<script src="./GroupPage.js"/>

<style scoped src="./GroupPage.css"/>