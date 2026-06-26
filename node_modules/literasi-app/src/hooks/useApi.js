import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/services';

export const useInfo = (category) => {
  return useQuery({
    queryKey: ['info', category],
    queryFn: () => api.fetchInfo(category),
  });
};

export const useAgenda = (category) => {
  return useQuery({
    queryKey: ['agenda', category],
    queryFn: () => api.fetchAgenda(category),
  });
};

export const useMitra = (type) => {
  return useQuery({
    queryKey: ['mitra', type],
    queryFn: () => api.fetchMitra(type),
  });
};

export const useKonsulLive = () => {
  return useQuery({
    queryKey: ['konsul', 'live'],
    queryFn: () => api.fetchLiveAduan(),
    refetchInterval: 10000, // Refetch every 10 seconds for "live" feel
  });
};

export const useSubmitKonsul = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => api.submitAduan(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['konsul', 'live'] });
    },
  });
};

export const useDonasiStats = () => {
  return useQuery({
    queryKey: ['donasi', 'stats'],
    queryFn: () => api.fetchDonasiStats(),
  });
};

export const useDropoffLocations = () => {
  return useQuery({
    queryKey: ['donasi', 'dropoff'],
    queryFn: () => api.fetchDropoffLocations(),
  });
};

export const useSubmitJemputDonasi = () => {
  return useMutation({
    mutationFn: (payload) => api.submitJemputDonasi(payload),
  });
};
