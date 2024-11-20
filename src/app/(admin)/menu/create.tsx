import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'

const CreateProductScreen = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState('');

    const validateInput = () => {
        setErrors('');
        if (!name) {
            setErrors('Name is required');
            return false;
        }
        if (!price) {
            setErrors('Price is required');
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setErrors('Price is not number');
            return false;
        }
        return true;
    };

    const onCreate = () => {
        if(!validateInput()) {
            return;
        }
        console.warn('Creatin Product', name);
        resetField();
    };

    const resetField = () => {
        setName('');
        setPrice('');
        setDescription('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder='Name'
                style={styles.input}
            />

            <Text style={styles.label}>Price ($)</Text>
            <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder='9.99'
                style={styles.input}
                keyboardType='numeric'
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                multiline={true}
                placeholder='Description Product'
                numberOfLines={4}
                style={[styles.input, styles.inputArea]}
            />

            <Text style={{ color: 'red'}}>{errors}</Text>
            <Button onPress={onCreate} text='Create' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    label: {
        color: 'gray',
        fontSize: 16

    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20

    },
    inputArea: {
        height: 100,
        textAlignVertical: 'top'
    }
})

export default CreateProductScreen