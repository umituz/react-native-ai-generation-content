/**
 * Shared Kernel Module
 * Provides base types, utilities, and patterns for all domains
 * Following DDD principles with clean architecture
 */

// Base types
export * from './base-types';

// Application services
export * from './application/hooks';

// Domain layer
export * from './domain';

// Infrastructure utilities
export * from './infrastructure/validation';
