import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer"
import { View } from "react-native"
import { router } from "expo-router"

export default function Layout() {
    return(
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer 
                drawerContent={(props) => (
                    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
                        <DrawerItemList {...props} />

                         <View style={{ flex: 1 }} />

                         <DrawerItem
                            label="Sair"
                            onPress={() => {
                            router.replace("/auth/login");
                            }}/>
                            
                    </DrawerContentScrollView>                    
                )}>
                    
                <Drawer.Screen name='index' options={{ title: 'Início' }} />
                <Drawer.Screen name='collectList' options={{ title: 'Coletas' }} />
                <Drawer.Screen name='analysisList' options={{ title: 'Análises' }} />
                
            </Drawer>
        </GestureHandlerRootView>
    )
}