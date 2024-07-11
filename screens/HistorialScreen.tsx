import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { getDatabase, ref, onValue } from "firebase/database";
import { db } from '../config/Config';
import Card from '../components/Card';

export default function HistorialScreen() {
    const [lista, setlista] = useState([])
    useEffect(() => {
        Leer()
    }, [])

    function Leer() {
        const starCountRef = ref(db, 'operaciones/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const listaTemporal: any = Object.keys(data).map((id) => ({ id, ...data[id] }))

            setlista(listaTemporal)

        });
    }
    return (
        <View>
            <FlatList
                data={lista}
                renderItem={({ item }) =>
                    <Card data={item} />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({})