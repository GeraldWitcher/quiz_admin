<template>
    <v-app style="background-color: #faf9f7;">
        <SideBar/>
        <v-container fluid style="padding: 30px 100px 0px 100px;">
            <v-row no-gutters>
                <v-col 
                    cols="12" 
                    md="3" 
                    sm="6" 
                    xs="12"
                    v-for="(item, i) in dashboardCards"
                    :key="i"
                    class="pa-4"
                >
                    <v-card
                        width="100%"
                        height="150"
                        :color="item.color"
                        class="dashboard-card pa-5"
                        elevation="0"
                        tile
                        
                    >
                        <v-row no-gutters>
                            <v-icon 
                                color="primary"
                                size="35"
                            >
                                {{ item.icon }}
                            </v-icon>
                        </v-row>
                        <v-row no-gutters>
                            <div style="color: black; font-size: 30px; font-weight: 500;">{{ item.count }}</div>
                        </v-row>
                        
                        <v-row no-gutters>
                            <div style="color: black; font-size: 20px; font-weight: 200;">{{ item.text }}</div>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <div class="mt-10 pa-4">
                <apexchart type="bar" height="500" :options="BarChartOptions" :series="BarSeries"></apexchart>
            </div>
            <v-row no-gutters class="mt-10 pa-4">
                <v-col cols="12" md="6" sm="6">
                    <apexchart type="polarArea" :options="PolarChartOptions" :series="PolarSeries"></apexchart>
                </v-col>
                <v-col cols="12" md="6" sm="6">
                    <apexchart type="line" height="500" :options="LineChartOptions" :series="LineSeries"></apexchart>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script src="./DashboardPage.js"/>

<style scoped src="./DashboardPage.css"/>