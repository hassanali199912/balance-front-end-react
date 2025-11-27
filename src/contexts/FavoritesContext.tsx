import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import { favoritesAPI, UserFavoritesResponse, FavoriteProject, FavoriteUnit, InterestedProject, InterestedUnite } from '../services/favoritesAPI';
import { useAuth } from './useAuth';
import { useToast } from './useToast';
import { useLanguage } from './useLanguage';

export interface FavoritesContextType {
  // Favor
  favoriteProjects: FavoriteProject[];
  favoriteUnits: FavoriteUnit[];
  totalFavoriteProjects: number;
  totalFavoriteUnits: number;
  isLoading: boolean;
  error: string | null;
  // Interested
  interestedProjects: InterestedProject[];
  interestedUnits: InterestedUnite[];
  totalCountInterestedProjects: number;
  totalCountInterestedUnites: number;
  isInterestedLoading: boolean;
  interestedError: string | null;
  removeUnitFromInterested: (unitId: number) => Promise<void>;
  removeProjectFromInterested: (projectId: number) => Promise<void>;
  refreshInterested: () => Promise<void>;

  // Actions
  refreshFavorites: () => Promise<void>;
  addProjectToFavorites: (projectId: number) => Promise<void>;
  removeProjectFromFavorites: (projectId: number) => Promise<void>;
  addUnitToFavorites: (unitId: number) => Promise<void>;
  removeUnitFromFavorites: (unitId: number) => Promise<void>;
  isProjectFavorited: (projectId: number) => boolean;
  isUnitFavorited: (unitId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  //#region Fav
  const [favoriteProjects, setFavoriteProjects] = useState<FavoriteProject[]>([]);
  const [favoriteUnits, setFavoriteUnits] = useState<FavoriteUnit[]>([]);
  const [totalFavoriteProjects, setTotalFavoriteProjects] = useState(0);
  const [totalFavoriteUnits, setTotalFavoriteUnits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  //#endregion Fav

  //#region Interested

  const [interestedProjects, setInterestedProjects] = useState<InterestedProject[]>([]);
  const [interestedUnits, setInterestedUnites] = useState<InterestedUnite[]>([]);
  const [totalCountInterestedProjects, setTotalCountInterestedProjects] = useState<number>(0);
  const [totalCountInterestedUnites, setTotalCountInterestedUnites] = useState<number>(0);
  const [isInterestedLoading, setIsInterestedLoading] = useState<boolean>(false);
  const [interestedError, setInterestedError] = useState<string | null>(null);



  //#endregion Interested


  const { user, token, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  // Update favoritesAPI token when auth token changes
  useEffect(() => {
    favoritesAPI.setToken(token);
  }, [token]);

  const refreshFavorites = useCallback(async (): Promise<void> => {
    if (!user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await favoritesAPI.getUserFavorites(user.id);
      setFavoriteProjects(response.itemsProjects);
      setFavoriteUnits(response.itemsUnits);
      setTotalFavoriteProjects(response.totalCountProjects);
      setTotalFavoriteUnits(response.totalCountUnits);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load favorites';
      setError(errorMessage);
      console.error('Error loading favorites:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  const refreshInterested = useCallback(async (): Promise<void> => {
    if (!user?.id) return;

    setIsInterestedLoading(true);
    setInterestedError(null);

    try {
      const response = await favoritesAPI.getInterestedAll(user.id);
      setInterestedProjects(response.itemsProjects);
      setInterestedUnites(response.itemsUnits);
      setTotalCountInterestedProjects(response.totalCountProjects);
      setTotalCountInterestedUnites(response.totalCountUnits);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load favorites';
      setInterestedError(errorMessage);
      console.error('Error loading favorites:', err);
    } finally {
      setIsInterestedLoading(false);
    }
  }, [user?.id])

  // Load favorites when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      refreshFavorites();
      refreshInterested();
    } else {
      // Clear favorites when user logs out
      setFavoriteProjects([]);
      setFavoriteUnits([]);
      setTotalFavoriteProjects(0);
      setTotalFavoriteUnits(0);
      // clear Interested 
      setInterestedProjects([]);
      setInterestedUnites([]);
      setTotalCountInterestedProjects(0);
      setTotalCountInterestedUnites(0);
    }
  }, [isAuthenticated, user?.id, refreshFavorites]);

  const addProjectToFavorites = async (projectId: number): Promise<void> => {
    if (!user?.id) {
      showToast('error', isArabic ? 'يرجى تسجيل الدخول أولاً' : 'Please sign in first');
      return;
    }

    try {
      await favoritesAPI.addProjectToFavorites({
        userId: user.id,
        projectId,
        isAvailable: true
      });

      // Refresh favorites to get updated list
      await refreshFavorites();

      showToast('success', isArabic ? 'تم إضافة المشروع للمفضلة!' : 'Project added to favorites!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add to favorites';
      showToast('error', isArabic ? 'فشل في إضافة المشروع للمفضلة' : 'Failed to add project to favorites');
      console.error('Error adding project to favorites:', err);
    }
  };

  const removeProjectFromFavorites = async (projectId: number): Promise<void> => {
    if (!user?.id) return;

    try {
      await favoritesAPI.removeProjectFromFavorites(projectId);

      // Refresh favorites to get updated list
      await refreshFavorites();

      showToast('success', isArabic ? 'تم إزالة المشروع من المفضلة!' : 'Project removed from favorites!');
    } catch (err) {

      const errorMessage = err instanceof Error ? err.message : 'Failed to remove from favorites';
      showToast('error', isArabic ? 'فشل في إزالة المشروع من المفضلة' : 'Failed to remove project from favorites');
      console.error('Error removing project from favorites:', err);
    }
  };

  const addUnitToFavorites = async (unitId: number): Promise<void> => {
    if (!user?.id) {
      showToast('error', isArabic ? 'يرجى تسجيل الدخول أولاً' : 'Please sign in first');
      return;
    }

    try {
      await favoritesAPI.addUnitToFavorites({
        userId: user.id,
        unitId,
        isAvailable: true
      });

      // Refresh favorites to get updated list
      await refreshFavorites();

      showToast('success', isArabic ? 'تم إضافة العقار للمفضلة!' : 'Property added to favorites!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add to favorites';
      showToast('error', isArabic ? 'فشل في إضافة العقار للمفضلة' : 'Failed to add property to favorites');
      console.error('Error adding unit to favorites:', err);
    }
  };

  const removeUnitFromFavorites = async (unitId: number): Promise<void> => {
    if (!user?.id) return;

    try {
      await favoritesAPI.removeUnitFromFavorites(unitId);

      // Refresh favorites to get updated list
      await refreshFavorites();

      showToast('success', isArabic ? 'تم إزالة العقار من المفضلة!' : 'Property removed from favorites!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove from favorites';
      showToast('error', isArabic ? 'فشل في إزالة العقار من المفضلة' : 'Failed to remove property from favorites');
      console.error('Error removing unit from favorites:', err);
    }
  };

  const removeProjectFromInterested = async (projectId: number): Promise<void> => {
    if (!user?.id) return;

    try {
      await favoritesAPI.removeProjectFromInterested(projectId);

      // Refresh favorites to get updated list
      await refreshInterested();

      showToast('success', isArabic ? 'تم إزالة المشروع من الاهتمامات!' : 'Project removed from interested!');
    } catch (err) {

      const errorMessage = err instanceof Error ? err.message : 'Failed to remove from interested';
      showToast('error', isArabic ? 'فشل في إزالة المشروع من الاهتمامات' : 'Failed to remove project from interested');
      console.error('Error removing project from interested:', err);
    }
  };

  const removeUnitFromInterested = async (unitId: number): Promise<void> => {
    if (!user?.id) return;

    try {
      await favoritesAPI.removeUnitFromInterested(unitId);

      // Refresh favorites to get updated list
      await refreshInterested();

      showToast('success', isArabic ? 'تم إزالة العقار من الاهتمامات!' : 'Property removed from interested!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove from interested';
      showToast('error', isArabic ? 'فشل في إزالة العقار من الاهتمامات' : 'Failed to remove property from interested');
      console.error('Error removing unit from interested:', err);
    }
  };

  const isProjectFavorited = (projectId: number): boolean => {
    return favoriteProjects.some(project => project.projectId === projectId);
  };

  const isUnitFavorited = (unitId: number): boolean => {
    return favoriteUnits.some(unit => unit.projectId === unitId);
  };

  const value: FavoritesContextType = {
    favoriteProjects,
    favoriteUnits,
    totalFavoriteProjects,
    totalFavoriteUnits,
    isLoading,
    error,
    refreshFavorites,
    addProjectToFavorites,
    removeProjectFromFavorites,
    addUnitToFavorites,
    removeUnitFromFavorites,
    isProjectFavorited,
    isUnitFavorited,

    // Interested
    interestedProjects,
    interestedUnits,
    totalCountInterestedProjects,
    totalCountInterestedUnites,
    isInterestedLoading,
    interestedError,
    refreshInterested,
    removeUnitFromInterested,
    removeProjectFromInterested
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext };
