import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/api/products';
import Button from '@/components/Button';
import { defaultProductImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import { useEventListener } from 'expo';
import * as ImagePicker from 'expo-image-picker';
import { router, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native';


const CreateProductScreen = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]);
    const isUpdating = !!idString;

    const { mutate: insertProduct } = useInsertProduct();
    const { mutate: updateProduct } = useUpdateProduct();
    const { data: updatingproduct } = useProduct(id);
    const { mutate: deleteProduct } = useDeleteProduct();

    const router = useRouter();

    useEffect(() => {
        if (updatingproduct) {
            setName(updatingproduct.name);
            setPrice(updatingproduct.price.toString());
            setImage(updatingproduct.image);
        }
    }, [updateProduct])


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

    const onSubmit = () => {
        if (isUpdating)
            onUpdate();
        else
            onCreate();
    };

    const onCreate = () => {
        if (!validateInput()) {
            return;
        }
        console.warn('Creatin Product', name);

        insertProduct({ name, price: parseFloat(price), image }, {
            onSuccess: () => {
                resetField();
                router.back();
            }
        })

    };

    const onUpdate = () => {
        if (!validateInput()) {
            return;
        }
        updateProduct(
            { id, name, price: parseFloat(price), image },
            {
                onSuccess: () => {
                    resetField();
                    router.back();
                }
            });
    };

    const onDelete = () => {
        deleteProduct( id, {
            onSuccess: () => {
                resetField();
                router.replace('/(admin)');
            },
        });

    }
    const confirmDelete = () => {
        Alert.alert('Confirmar', '¿Está seguro de elminar este Producto?', [
            {
                text: 'Cancelar',
            },
            {
                text: 'Eliminar',
                style: 'destructive',
                onPress: onDelete,
            },
        ]);
    };

    const resetField = () => {
        setName('');
        setPrice('');
        setDescription('');
        setImage('');

    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>

            <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product' }} />

            <Image source={{ uri: image || defaultProductImage }} style={styles.image} />
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>

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

            <Text style={{ color: 'red' }}>{errors}</Text>
            <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Create'} />
            {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
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
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center'
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10
    }

})

export default CreateProductScreen