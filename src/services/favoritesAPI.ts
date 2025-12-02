const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://balancerealestate.runasp.net/api';

export interface FavoriteUnit {
  userId: string,
  nameAr: string,
  nameEn: string,
  price: number,
  location: string,
  mainImageUrl: string,
  unitId: number
}

export interface FavoriteProject {
  userId: string,
  nameAr: string,
  nameEn: string,
  price: number,
  location: string,
  mainImageUrl: string,
  projectId: number

}

export interface UserFavoritesResponse {
  itemsProjects: FavoriteProject[];
  itemsUnits: FavoriteUnit[];
  totalCountProjects: number;
  totalCountUnits: number;
}

export interface FavoriteProjectsResponse {
  items: FavoriteProject[];
  totalCount: number;
}

export interface FavoriteUnitsResponse {
  items: FavoriteUnit[];
  totalCount: number;
}

export interface AddToFavoritesRequest {
  userId: string;
  unitId?: number;
  projectId?: number;
  isAvailable: boolean;
}


export interface InterestedProject {
  userId: string,
  fullName: string,
  phone: string,
  email: string,
  projectId: number,
  methodId: number,
  projectNameAr: string,
  projectNameEn: string,
  price: number,
  mainImageUrl: string,
  locationAr: string,
  locationEn: string,
  notes: string

}

export interface InterestedUnite {
  userId: string,
  fullName: string,
  phone: string,
  email: string,
  methodId: number,
  price: number,
  mainImageUrl: string,
  locationAr: string,
  locationEn: string,
  notes: string,
  unitId: number,
  unitTitleAr: string,
  unitTitleEn: string,
  isAvailible: boolean,

}


export interface InterestedAllResponse {
  itemsProjects: InterestedProject[],
  itemsUnits: InterestedUnite[],
  totalCountProjects: number,
  totalCountUnits: number
}

export interface RemoveData {
  message: string
}



class FavoritesAPI {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = `${API_BASE_URL}/`;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;

        try {
          const errorData = await response.json();
          // Handle different error response formats
          if (errorData.detail) {
            errorMessage = errorData.detail;
          } else if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.title) {
            errorMessage = errorData.title;
          }
        } catch (parseError) {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      try {
        const jsonData = await response.json();
        return jsonData as T;
      } catch {
        return { message: "Operation successful." } as unknown as T;
      }
    } catch (error) {
      console.error('Favorites API Error:', error);
      throw error;
    }
  }

  // GET /favorites/user-units-projects/{userId}
  async getUserFavorites(userId: string): Promise<UserFavoritesResponse> {
    return this.request<UserFavoritesResponse>(`favorites/user-units-projects/${userId}`);
  }

  // GET /favorites/project/{userId}
  async getFavoriteProjects(userId: string): Promise<FavoriteProjectsResponse> {
    return this.request<FavoriteProjectsResponse>(`favorites/project/${userId}`);
  }

  // GET /favorites/unit/{userId}
  async getFavoriteUnits(userId: string): Promise<FavoriteUnitsResponse> {
    return this.request<FavoriteUnitsResponse>(`favorites/unit/${userId}`);
  }

  // POST /favorites/unit
  async addUnitToFavorites(data: AddToFavoritesRequest): Promise<FavoriteUnitsResponse> {
    return this.request<FavoriteUnitsResponse>('favorites/unit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // POST /favorites/project
  async addProjectToFavorites(data: AddToFavoritesRequest): Promise<FavoriteProjectsResponse> {
    return this.request<FavoriteProjectsResponse>('favorites/project', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT /favorites/unit?unitId={unitId}
  async removeUnitFromFavorites(unitId: number): Promise<FavoriteUnitsResponse> {
    return this.request<FavoriteUnitsResponse>(`favorites/unit?unitId=${unitId}`, {
      method: 'PUT',
    });
  }

  // PUT /favorites/project?projectId={projectId}
  async removeProjectFromFavorites(projectId: number): Promise<FavoriteProjectsResponse> {
    return this.request<FavoriteProjectsResponse>(`favorites/project?projectId=${projectId}`, {
      method: 'PUT',
    });
  }


  async getInterestedAll(userId: string): Promise<InterestedAllResponse> {
    return this.request<InterestedAllResponse>(`interests/user-units-projects/${userId}`);
  }

  async removeUnitFromInterested(unitId: number): Promise<RemoveData> {
    return this.request<RemoveData>(`interests/unit?unitId=${unitId}`, {
      method: 'DELETE',
    });
  }
  async removeProjectFromInterested(projectId: number): Promise<RemoveData> {
    return this.request<RemoveData>(`interests/project?projectId=${projectId}`, {
      method: 'DELETE',
    });
  }







}

export const favoritesAPI = new FavoritesAPI();
