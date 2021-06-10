<template>
    <!--        style="background-color:#FEFFFE; border-bottom : solid 3px #FF0000;"-->
    <v-app-bar
            app
            clipped-left
            clipped-right
            color="white"
            class="elevation-3"
            absolute
    >
            <!--                <v-app-bar-nav-icon color="purple" @click.stop="$emit('app-navigator:toggle',drawer = !drawer)"></v-app-bar-nav-icon>-->
<!--            <v-app-bar-nav-icon></v-app-bar-nav-icon>-->
            <v-toolbar-title v-html="title"
                             class="brand-title default_brand--size ml-4 mb-1 mr-9 font-weight-bold blue--text"
                             style="cursor: pointer;" @click="$router.replace({name:'home'})"></v-toolbar-title>
            <!--                <v-toolbar-items class="hidden-sm-and-down ml-5 pl-3">-->
            <!--                    <v-layout row fill-height align-center>-->

            <template v-for="(menuItem,index) in toolbar.leftMenu">
                <v-btn
                        v-if="!menuItem.type"
                        text
                        large
                        color="green"
                        :disabled="menuItem.disable"
                        :to="menuItem.to">
                    <span class="">{{menuItem.name}}</span>
                </v-btn>

                <v-menu v-else min-width="150" dark open-on-hover offset-y bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn
                                v-on="on"
                                :ripple="false"
                                active-class="active--toolbar-btn"
                                text
                                small
                                color="grey"
                                depressed
                                :disabled="menuItem.disable"
                                class="toolbar-btn"
                                :to="menuItem.to">
                            <v-tooltip bottom v-if="!menuItem.name">
                                <v-icon v-if="menuItem.icon" slot="activator"
                                >{{menuItem.icon}}
                                </v-icon>
                                <span>{{menuItem.tooltip}}</span>
                            </v-tooltip>
                            {{menuItem.name}}
                        </v-btn>
                    </template>

                    <v-list dense color="">
                        <v-list-item
                                v-for="(item, index) in menuItem.items"
                                :key="index"
                                :to="item.to"
                        >
                            <v-list-item-title class="font-weight-medium white--text">{{ item.name }}
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <span v-if="(index !== (toolbar.leftMenu.length - 1))" class="font-weight-light grey--text">|</span>
                <!--<v-divider v-if="(index !== (toolbar.leftMenu.length - 1))" inset vertical-->
                <!--style="max-height:2px;"></v-divider>-->
            </template>
            <v-spacer></v-spacer>
            <template v-for="(menuItem,index) in toolbar.rightMenu">
                <v-btn
                        v-if="!$store.state.authToken"
                        icon
                        large
                        color="blue"
                        :disabled="menuItem.disable"
                        :to="menuItem.to">
                    <v-icon v-if="menuItem.icon">{{menuItem.icon}}</v-icon>
<!--                    {{menuItem.name}}-->
                </v-btn>
                <v-menu
                        v-else
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-width="200"
                        offset-y
                >
                    <template v-slot:activator="{ on, attrs }">

                        <v-btn
                                large
                                text
                                color="blue"
                                v-on="on"
                                :disabled="menuItem.disable">
                            <v-icon left v-if="menuItem.icon">person</v-icon>
                            My Account
                            <!--                    {{menuItem.name}}-->
                        </v-btn>
                    </template>

                    <v-card>
                        <v-list>
                            <v-list-item>
                                <v-list-item-avatar>
                                    <v-icon large>account_circle</v-icon>
<!--                                    <v-img src="https://avataaars.com/?accessoriesType=Blank&avatarStyle=Circle&clotheType=BlazerSweater&eyeType=Squint&eyebrowType=Default&facialHairColor=Blonde&facialHairType=BeardMedium&hairColor=Black&mouthType=Smile&skinColor=Light&topType=ShortHairShortWaved" alt="John"/>-->
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>Ayvos Customer</v-list-item-title>
<!--                                    <v-list-item-subtitle></v-list-item-subtitle>-->
                                </v-list-item-content>
                                <v-list-item-action>
<!--                                    <v-btn-->
<!--                                            :class="fav ? 'red&#45;&#45;text' : ''"-->
<!--                                            icon-->
<!--                                            @click="fav = !fav"-->
<!--                                    >-->
<!--                                        <v-icon>mdi-heart</v-icon>-->
<!--                                    </v-btn>-->
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>

                        <v-divider></v-divider>

                        <v-list>
                            <v-list-item :to="{name:'customer_address'}">
<!--                                <v-list-item-action>-->
<!--                                    <v-switch v-model="message" color="purple"></v-switch>-->
<!--                                </v-list-item-action>-->
                                <v-list-item-avatar >
                                    <v-icon>place</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-title>Addresses</v-list-item-title>
                            </v-list-item>

                            <v-list-item :to="{name:'customer_orders'}">
<!--                                <v-list-item-action>-->
<!--                                    <v-switch v-model="hints" color="purple"></v-switch>-->
<!--                                </v-list-item-action>-->
<!--                                <v-list-item-title>Enable hints</v-list-item-title>-->
                                <v-list-item-avatar>
                                    <v-icon>unarchive</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-title>Orders</v-list-item-title>
                            </v-list-item>
                        </v-list>

                        <v-card-actions>
<!--                            <v-spacer></v-spacer>-->
                            <v-btn text block @click="logout">
                                <v-icon left dark>mdi-logout</v-icon>
                                Logout
                            </v-btn>
<!--                            <v-btn text @click="menu = false">Cancel</v-btn>-->
<!--                            <v-btn color="primary" text @click="menu = false">Save</v-btn>-->
                        </v-card-actions>
                    </v-card>
                </v-menu>


                <!--                            <span v-if="(index !== (toolbar.leftMenu.length - 1))" class="font-weight-light grey&#45;&#45;text">|</span>-->
            </template>
    </v-app-bar>

<!--  <v-app-bar-->

<!--  >-->
<!--    <v-app-bar-nav-icon></v-app-bar-nav-icon>-->

<!--    <v-toolbar-title>Title</v-toolbar-title>-->

<!--    <v-spacer></v-spacer>-->

<!--    <v-btn icon>-->
<!--      <v-icon>mdi-magnify</v-icon>-->
<!--    </v-btn>-->

<!--    <v-btn icon>-->
<!--      <v-icon>mdi-heart</v-icon>-->
<!--    </v-btn>-->

<!--    <v-btn icon>-->
<!--      <v-icon>mdi-dots-vertical</v-icon>-->
<!--    </v-btn>-->
<!--  </v-app-bar>-->
</template>

<script>
    import Cart from "../../views/Cart";

    export default {
        name: "CoreToolbar",
        components: {
            Cart
        },

        data: (vm) => ({
            fav: true,
            menu: false,
            message: false,
            hints: true,

            snackbar: false,
            snackbarText: "",
            cartSheet: false,
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            sideIconStatus: false,
            title: process.env.VUE_APP_NAME,
            loggingOut: false,
            drawer: true,
            toolbar: {
                leftMenu: [
                    {name: 'Home', icon: 'person', to: {name: 'home'}},
                    {name: 'Products', icon: 'product', to: {name: 'products'}},
                    {name: 'About', icon: 'person', to: {name: 'about'}}
                ],
                rightMenu: [
                    {name: '', icon: 'mdi-login',loggedIn: vm.$store.state.authToken ,to: {name: 'login'}},
                    ],
            },
        }),
        methods: {
            logout() {
                this.loggingOut = true;
                this.$store.dispatch('logout')
                this.$nextTick(() => {
                    this.loggingOut = false;
                })
            },
            navigateToLocationSelection() {
                this.cartSheet = false;
                this.$router.push({name: "payment"});
            },
            navigateHome() {
                this.$router.push({name: 'home'});
            },

        }
    }
</script>


<style scoped>

    .v-text-field__slot:has( #menuSearchInput) {
        border-radius: 25px !important;
    }

    .brand-title {
        font-family: 'Megrim', cursive;
    //font-family: 'Faster One', cursive;
        /*font-family: 'Pattaya', sans-serif;*/
        font-size: 40px !important;
        text-align: center;
        font-weight: bolder;
    }

    /*.toolbar-btn:hover {*/
    /*    color: black !important;*/
    /*    !*background-color: #00acc1 !important;*!*/
    /*}*/

    .active--toolbar-btn {
        /*color: #FF0000 !important;*/
        color: #FF0000 !important;
        /*background-color: #FFEBEE !important;*/
        background-color: #FFFFFF !important;
    }
</style>