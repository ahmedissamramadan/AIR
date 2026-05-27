// Re-export all types and data from modular files
// This maintains backward compatibility with existing imports

export * from './types';
export * from './authors';

// Note: For large data files (posts, tools, systems, glossary),
// import them directly from the original data.ts file for now.
// A full split would require significant refactoring due to file size.

// Re-export from the original data.ts for backward compatibility
export {
    posts,
    tools,
    systems,
    glossaryTerms,
    servicePackages,
    courses
} from '../data';
