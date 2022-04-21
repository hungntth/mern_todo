import axiosClient from "./axiosClient";

const todoApi = {
    getAll(params) {
        const url = '/tasks';
        return axiosClient.get(url, { params })
    },
    get(id) {
        const url = `/tasks/${id}`;
        return axiosClient.get(url, { url })
    },
    add(data) {
        const url = '/tasks';
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/tasks/${data.id}`;
        return axiosClient.patch(url, data)
    },
    remove(id) {
        const url = `/tasks/${id}`;
        return axiosClient.delete(url, { url })
    }
};

export default todoApi;