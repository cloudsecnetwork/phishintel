import { useState, useCallback } from 'react';
import { axiosInstance } from '../services/axiosInstance';

export const useTemplates = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // List view state (Saved tab: search + pagination)
    const [listLoading, setListLoading] = useState(false);
    const [paginationState, setPaginationState] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0,
        from: null,
        to: null,
    });
    const [listFilters, setListFilters] = useState({ search: '' });

    const fetchTemplates = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/api/template');
            if (response.data.success) {
                setTemplates(response.data.data);
            } else {
                const errorMessage = response.data.message || 'Unable to complete request';
                setError(errorMessage);
                return { success: false, message: errorMessage };
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchTemplateList = useCallback(async (overrides = {}) => {
        setListLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
            const page = overrides.page ?? paginationState.current_page;
            const perPage = overrides.per_page ?? paginationState.per_page;
            const search = overrides.search !== undefined ? overrides.search : listFilters.search;
            params.set('page', String(page));
            params.set('per_page', String(perPage));
            if (search && search.trim()) params.set('search', search.trim());

            const response = await axiosInstance.get(`/api/template/list?${params.toString()}`);
            if (response.data.success) {
                const { data } = response.data;
                setTemplates(data.templates || []);
                setPaginationState(data.pagination || paginationState);
                if (data.filters) setListFilters((prev) => ({ ...prev, ...data.filters }));
                return { success: true, data: data };
            } else {
                const errorMessage = response.data.message || 'Unable to complete request';
                setError(errorMessage);
                return { success: false, message: errorMessage };
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setListLoading(false);
        }
    }, [paginationState, listFilters.search]);

    const createTemplate = useCallback(async (formDataOrPayload) => {
        setLoading(true);
        setError(null);
        try {
            const isPlainObject = formDataOrPayload != null && !(formDataOrPayload instanceof FormData) && typeof formDataOrPayload === 'object';
            const response = isPlainObject
                ? await axiosInstance.post('/api/template', formDataOrPayload, { headers: { 'Content-Type': 'application/json' } })
                : await axiosInstance.post('/api/template', formDataOrPayload);
            if (response.data.success) {
                setTemplates((prevTemplates) => [...prevTemplates, response.data.data]);
                return { success: true, data: response.data.data };
            } else {
                const errorMessage = response.data.message || 'Unable to complete request';
                setError(errorMessage);
                return { success: false, message: errorMessage };
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    const updateTemplate = useCallback(async (id, formDataOrPayload) => {
        setLoading(true);
        setError(null);
        try {
            const isPlainObject = formDataOrPayload != null && !(formDataOrPayload instanceof FormData) && typeof formDataOrPayload === 'object';
            const response = isPlainObject
                ? await axiosInstance.put(`/api/template/${id}`, formDataOrPayload, { headers: { 'Content-Type': 'application/json' } })
                : await axiosInstance.put(`/api/template/${id}`, formDataOrPayload);
            if (response.data.success) {
                setTemplates((prevTemplates) =>
                    prevTemplates.map((template) => template._id === id ? response.data.data : template)
                );
                return { success: true, data: response.data.data };
            } else {
                const errorMessage = response.data.message || 'Unable to complete request';
                setError(errorMessage);
                return { success: false, message: errorMessage };
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteTemplate = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.delete(`/api/template/${id}`);
            if (response.data.success) {
                setTemplates((prev) => prev.filter((t) => t._id !== id));
                return { success: true, message: 'Template deleted successfully' };
            } else {
                const errorMessage = response.data.message || 'Unable to complete request';
                setError(errorMessage);
                return { success: false, message: errorMessage };
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    const getTemplateById = useCallback(async (id) => {
        try {
            const response = await axiosInstance.get(`/api/template/${id}`);
            if (response.data.success) return { success: true, data: response.data.data };
            return { success: false, message: response.data.message };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || err.message };
        }
    }, []);

    return {
        templates,
        loading,
        error,
        listLoading,
        paginationState,
        listFilters,
        setListFilters,
        fetchTemplates,
        fetchTemplateList,
        getTemplateById,
        createTemplate,
        updateTemplate,
        deleteTemplate,
    };
};
