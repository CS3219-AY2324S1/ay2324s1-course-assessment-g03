import { z } from "zod";

export const githubEmailResponseSchema = z.array(
  z.object({
    email: z.string().email(),
    primary: z.boolean(),
    verified: z.boolean(),
    visibility: z.enum(["public", "private"]).nullish(),
  })
);

export type GithubEmailResponse = z.infer<typeof githubEmailResponseSchema>;

export const githubUserResponseSchema = z.object({
  login: z.string(),
  id: z.number(),
  node_id: z.string(),
  avatar_url: z.string().url().nullish(),
  gravatar_id: z.string().nullish(),
  url: z.string().url(),
  html_url: z.string().url(),
  followers_url: z.string().url(),
  following_url: z.string().url(),
  gists_url: z.string().url(),
  starred_url: z.string().url(),
  subscriptions_url: z.string().url(),
  organizations_url: z.string().url(),
  repos_url: z.string().url(),
  events_url: z.string().url(),
  received_events_url: z.string().url(),
  type: z.string(),
  site_admin: z.boolean(),
  name: z.string().nullish(),
  company: z.string().nullish(),
  blog: z.string().nullish(),
  location: z.string().nullish(),
  email: z.string().nullish(),
  hireable: z.boolean().nullish(),
  bio: z.string().nullish(),
  twitter_username: z.string().nullish(),
  public_repos: z.number(),
  public_gists: z.number(),
  followers: z.number(),
  following: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type GithubUserResponse = z.infer<typeof githubUserResponseSchema>;
