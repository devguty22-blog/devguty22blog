import Image from "next/image";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function Home() {
  const blogDir  = "src/blogs";
  const currentDirectory = process.cwd()

  const foldersBlog = fs.readdirSync(path.join(currentDirectory, blogDir))
                        .filter(filename => !filename.endsWith('.mdx'));

  const blogIntoFolder = foldersBlog
    .filter(filenameIntoBlog => !filenameIntoBlog.endsWith('.mdx'))
    .map(filenameIntoBlog => {
      const filesIntoBlog = fs.readdirSync(path.join(currentDirectory, `${blogDir}/${filenameIntoBlog}`));
      return filesIntoBlog
        .filter(filename => filename.endsWith('.mdx'))
        .map(filename =>{
          const fileContent = fs.readFileSync(path.join(`${blogDir}/${filenameIntoBlog}`, filename), 'utf-8')
          const {data: frontMatter} = matter(fileContent);
          return {
            folderBlog: `${filenameIntoBlog}`,
            meta: frontMatter,
            slug: filename.replace('.mdx', '')
          }
        })
    })


  return (
    <main>
      <h1>
        My Next.Js Blog Site
      </h1>
      <section>
        <h2>
          Latest Blogs
        </h2>
      </section>
      <div>
        {blogIntoFolder.map(folder => (
            folder.map(blog =>(
              <Link href={`/blogs/${blog.folderBlog}/` + blog.slug} passHref key={blog.slug}>
                <div className='py-2 flex justify-between align-middle gap-2'>
                  <div>
                    <h3 className='text-lg font-blod'>
                      {blog.meta.title}
                    </h3>
                    <div>
                      <p className='text-gray-400'>{blog.meta.description}</p>
                    </div>
                    <div className='my-auto text-gray-400'>
                      <p>{blog.meta.date}</p>
                    </div>
                  </div> 
                </div>
              </Link>
            ))
          ))
        }
      </div>
    </main>
  );
}
