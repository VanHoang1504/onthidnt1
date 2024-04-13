import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, Alert, StyleSheet, Modal, Text, TouchableOpacity, View, Button, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoApi, updateTodoApi, fetchTodos, addTodoAPI } from '../redux/actions/todoAction';
import Banner from '../component/banner';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSpring,
} from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const HomeScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [ma, setMa] = useState('');
    const [tieude, setTieude] = useState('');
    const [namxb, setnamxb] = useState('');
    const [sotrang, setSotrang] = useState('');
    const [theloai, setTheloai] = useState('');
    const [Soluong, setSoluong] = useState('');
    const [hinhanh, setHinhanh] = useState(null);
    const [Dongia, setDongia] = useState('')
    const [id, setId] = useState('');
    const [update, setUpdate] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const listTodo = useSelector(state => state.todos.listTodo);
    const dispatch = useDispatch();
    const opacity = useSharedValue(0);
    const scale = useSharedValue(1);
    const offset = useSharedValue(10);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: offset.value }],
    }));

    React.useEffect(() => {
        offset.value = withRepeat(withSpring(-offset.value), -1, true);
    }, []);

    const handlePressIn = () => {
        scale.value = withSpring(0.7);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    const animatedStyleButton = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 5000 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const openDetailModal = (item) => {
        setSelectedStudent(item);
        setDetailModalVisible(true);
    };

    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>
            <Banner uri={"https://dichvuphotoshop.net/wp-content/uploads/2021/03/banner-dep.jpg"} />
            <View style={{ flex: 1, padding: 10, backgroundColor: '#2ecc71' }}>
                <Animated.Text
                    style={[
                        { fontWeight: 'bold', fontSize: 30, color: 'white', marginBottom: 10 },
                        animatedStyle,
                    ]}
                >
                    Danh sách Sách
                </Animated.Text>
                <FlatList
                    data={listTodo}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => openDetailModal(item)}
                                style={{ width: '100%', padding: 10, height: 240, marginBottom: 10, flexDirection: 'row', backgroundColor: 'white', borderRadius: 10 }}
                            >
                                {/* Existing student item view */}
                                <View style={{ flex: 1, marginRight: 15, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        style={{ width: 100, height: 100, backgroundColor: 'red', borderRadius: 10 }}
                                        source={{ uri:item.hinh_anh_ph42448 }}
                                    />
                                </View>
                                <View style={{ flex: 2, justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>
                                        Mã sach: {item.ma_sach_ph42448}
                                    </Text>
                                    <Text>
                                        Tiêu đề: {item.tieu_de_ph42448}
                                    </Text>
                                    
                                </View>
                              
                            </TouchableOpacity>
                        );
                    }}
                />
                {/* Add Student Button */}
                {/* <AnimatedTouchableOpacity
                    onPress={() => {
                        setUpdate(false);
                        setId('');
                        setMa('');
                        setTen('');
                        setGioiTinh('');
                        setNgaySinh('');
                        setEmail('');
                        setSdt('');
                        setModalVisible(true);
                    }}
                    style={[
                        {
                            position: 'absolute',
                            end: 40,
                            bottom: 40,
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: 'orange',
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                        animatedStyles,
                    ]}
                >
                    <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>+</Text>
                </AnimatedTouchableOpacity> */}

                {/* Detail Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={detailModalVisible}
                    onRequestClose={() => {
                        setDetailModalVisible(false);
                    }}
                >
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 350, height: 450, borderRadius: 20, justifyContent: 'space-evenly', alignItems: 'center', padding: 10, backgroundColor: 'white' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Chi tiết Sách</Text>
                            {selectedStudent && (
                                <View>
                                    <Image style={{width: 70, height: 70,borderRadius: 10}}
                                    source={{uri:selectedStudent.hinh_anh_ph42448}}/>
                                    <Text>Mã sách: {selectedStudent.ma_sach_ph42448}</Text>
                                    <Text>Tiêu đề: {selectedStudent.tieu_de_ph42448}</Text>
                                    <Text>Tác Giả: {selectedStudent.tac_gia_ph42448}</Text>
                                    <Text>Nam Xuất Bản: {selectedStudent.nam_xuat_ban_ph42448}</Text>
                                    <Text>So Trang: {selectedStudent.so_trang_ph42448}</Text>
                                    <Text>Thể loại: {selectedStudent.the_loai_ph42448}</Text>
                                    <Text>Đơn giá: {selectedStudent.don_gia_ph42448}</Text>

                                </View>
                            )}
                            <Button
                                title="Đóng"
                                onPress={() => setDetailModalVisible(false)}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    bannerCss: {
        width: '100%',
        height: 200,
    },
});
