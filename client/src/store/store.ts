import axios from 'axios';
import { makeAutoObservable } from 'mobx';

import { API_URL } from '../http/index';
import { IUser } from '../models/IUser';
import { AuthResponse } from '../models/response/AuthResponse';
import { AuthService } from '../services/AuthService';

export class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);

      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);

      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      console.log(response);
      localStorage.removeItem('token');

      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (error) {
      console.log(error);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.accessToken);
      console.log(response);

      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  }
}
