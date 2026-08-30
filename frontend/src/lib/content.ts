import fs from "fs";
import matter from "gray-matter";
import path from "path";

const contentDirectory = path.join(process.cwd(), "content");

export interface ContentItem {
  id: string;
  [key: string]: unknown;
}

function parseMarkdownFile(filePath: string): ContentItem {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...data,
    id: data.id || path.basename(filePath, ".md"),
    content: content.trim(),
  } as ContentItem;
}

function getFilesInDirectory(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter((file) => file.endsWith(".md") && file !== "readme.md");
  } catch {
    return [];
  }
}

export function getContentCollection(collection: string): ContentItem[] {
  const collectionDir = path.join(contentDirectory, collection);

  // If subdirectory exists, read from it; otherwise read from root with prefix
  if (fs.existsSync(collectionDir)) {
    const files = getFilesInDirectory(collectionDir);
    return files.map((file) => parseMarkdownFile(path.join(collectionDir, file)));
  }

  // Fallback: read markdown files from root content directory
  const files = getFilesInDirectory(contentDirectory);
  return files.map((file) => parseMarkdownFile(path.join(contentDirectory, file)));
}

export function getContentItem(collection: string, slug: string): ContentItem | null {
  const collectionDir = path.join(contentDirectory, collection);
  const filePath = path.join(collectionDir, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    return parseMarkdownFile(filePath);
  }

  // Fallback: search root content directory
  const rootPath = path.join(contentDirectory, `${slug}.md`);
  if (fs.existsSync(rootPath)) {
    return parseMarkdownFile(rootPath);
  }

  return null;
}

/**
 * Simple markdown-to-HTML conversion for basic formatting.
 * Supports: bold, italic, paragraphs, and unordered lists.
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Convert bold **text**
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Convert italic *text*
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Convert unordered lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

  // Convert paragraphs (double newlines)
  html = html.split("\n\n").map((block) => {
    block = block.trim();
    if (!block) return "";
    if (block.startsWith("<ul>") || block.startsWith("<li>")) return block;
    if (block.startsWith("<h")) return block;
    return `<p>${block}</p>`;
  }).join("\n");

  return html;
}
