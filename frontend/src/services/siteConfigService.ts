import { api } from './api';
import type { SiteConfig } from '@/types/builder';

export interface SiteConfigResponse {
    id: number;
    user_id: number;
    site_name: string;
    config_data: SiteConfig;
    is_published: boolean;
    slug: string;
    created_at: string;
    updated_at: string;
}

export interface PublicSiteResponse {
    site_name: string;
    slug: string;
    config_data: SiteConfig;
    updated_at: string;
}

export const siteConfigService = {
    /**
     * Get all site configurations for the authenticated user
     */
    async getMyConfigs(): Promise<SiteConfigResponse[]> {
        const response = await api.get<SiteConfigResponse[]>('/site-configs');
        return response.data;
    },

    /**
     * Get a specific site configuration by ID
     */
    async getById(id: number): Promise<SiteConfigResponse> {
        const response = await api.get<SiteConfigResponse>(`/site-configs/${id}`);
        return response.data;
    },

    /**
     * Create a new site configuration
     */
    async create(config: SiteConfig, siteName?: string, slug?: string): Promise<{ message: string; data: SiteConfigResponse }> {
        const response = await api.post<{ message: string; data: SiteConfigResponse }>('/site-configs', {
            site_name: siteName || config.siteName,
            config_data: config,
            slug: slug,
            is_published: false
        });
        return response.data;
    },

    /**
     * Update an existing site configuration
     */
    async update(id: number, config: SiteConfig, siteName?: string, slug?: string): Promise<{ message: string; data: SiteConfigResponse }> {
        const response = await api.put<{ message: string; data: SiteConfigResponse }>(`/site-configs/${id}`, {
            site_name: siteName || config.siteName,
            config_data: config,
            slug: slug
        });
        return response.data;
    },

    /**
     * Delete a site configuration
     */
    async delete(id: number): Promise<{ message: string }> {
        const response = await api.delete<{ message: string }>(`/site-configs/${id}`);
        return response.data;
    },

    /**
     * Publish or unpublish a site configuration
     */
    async publish(id: number, isPublished: boolean): Promise<{ message: string; data: SiteConfigResponse }> {
        const response = await api.post<{ message: string; data: SiteConfigResponse }>(`/site-configs/${id}/publish`, {
            is_published: isPublished
        });
        return response.data;
    },

    /**
     * Get a published site by slug (public, no authentication required)
     */
    async getPublicSite(slug: string): Promise<PublicSiteResponse> {
        const response = await api.get<PublicSiteResponse>(`/sites/${slug}/config`);
        return response.data;
    }
};
