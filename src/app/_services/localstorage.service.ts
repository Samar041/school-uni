import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    constructor() {
    }
    setAdminToken(adminToken: string) {
        localStorage.setItem('adminToken', adminToken);
    }
    setAdmin(admin: string) {
      localStorage.setItem('admin', admin);
    }
    getAdminToken() {
        return localStorage.getItem('adminToken');
    }
    setAdminRole(adminRole: string) {
        localStorage.setItem('adminRole', adminRole);
    }
    getAdminRole() {
        return localStorage.getItem('adminRole');
    }
    setAdminId(adminId: string) {
        localStorage.setItem('adminId', adminId);
    }
    getAdminId() {
        return localStorage.getItem('adminId');
    }
    getAdmin() {
        return localStorage.getItem('admin');
    }
    clear() {
        localStorage.clear();
    }
}
