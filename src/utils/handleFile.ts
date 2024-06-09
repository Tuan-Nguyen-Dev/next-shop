import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { replaceName } from './replaceName'
import { firebase, storage } from '@/firebases/firebaseConfig'
import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { collectionNames } from '@/constants/collectionNames'
import { handleResize } from './resizeImage'
import path from 'path'


export class HandleFile {

    static HandleFiles = (files: any, id: string) => {
        const items: any[] = []
        for (const i in files) {
            if (files[i].size && files[i].size > 0) {
                items.push(files[i])
            }
        }
        items.forEach(async item => {
            const newFile = await handleResize(item)
            await this.UploadToStore(newFile, id)
        })
    }


    static UploadToStore = async (file: any, id: string) => {
        const filename = replaceName(file.name)
        const path = `/images/${filename}`
        const storageRef = ref(storage, path)

        const res = await uploadBytes(storageRef, file)

        if (res) {
            if (res.metadata.size === file.size) {
                const url = await getDownloadURL(storageRef)
                await this.SaveToFireStore({ path, downloadUrl: url, id })
            } else {
                return 'uploading'
            }
        } else {
            return 'Error upload'
        }
    }

    static SaveToFireStore = async ({ path, downloadUrl, id }: { path: string, downloadUrl: string, id: string }) => {
        try {
            const snap = await addDoc(collection(firebase, collectionNames.files), {
                path,
                downloadUrl,
            })
            const fileId = snap.id
            if (fileId) {
                await updateDoc(doc(firebase, `offers/${id}`), {
                    files: arrayUnion(fileId)
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    static removeFile = async (id: string) => {
        try {
            const snap = await getDoc(doc(firebase, `${collectionNames.files}/${id}`))
            if (snap.exists()) {
                const { path, downloadUrl } = snap.data()
                if (path) {
                    await deleteObject((ref(storage, `${path}`))
                    )
                    await deleteDoc(doc(firebase, `files/${id}`))
                }

            }

        } catch (error) {
            console.log(error)
        }
    }
}